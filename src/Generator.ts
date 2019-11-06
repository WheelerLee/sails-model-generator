/**
 * 生成器的核心内容，包含生成的方法
 * 2019-09-10 13:20.
 *
 * @author WheelerLee https://github.com/WheelerLee
 * @copyright 2019 
 */
import colors from 'colors';
import fs from 'fs-extra';
import ejs from 'ejs';
import Worker from './Worker';

const omit_models = [
  'Attach', 'Xt_user', 'Xt_resource', 'Xt_role', 'Xt_dict', 'Xt_role_resource', 
  'Xt_user_resource', 'Xt_user_role', 'Xt_setting', 'Msg_send_record', 'Msg_message'
]; //需要忽略的模型

export default class Generator {

  folderName: string;

  constructor(folderName: string) {
    this.folderName = folderName;
  }

  /**
   * 生成后台代码
   * @param reset 是否覆盖已经存在的文件生成
   * @param skip 是否跳过依赖添加
   */
  generate(reset: boolean, skip: boolean): void {

    //是否需要重置
    if (reset) this.reset();
  
    //检查是否创建的位置已经存在文件
    if (fs.existsSync(`${process.cwd()}/views/${this.folderName}/`) || fs.existsSync(`${process.cwd()}/api/controllers/${this.folderName}/`)) {
      console.log(colors.red.bold(`请检查controllers或views文件夹, ${this.folderName}文件夹已经存在`));
      return;
    }

    //创建需要的文件夹
    this.createFolder();

    let models = this.getModels();
    for (let model of models) {
      this.generateModel(model);
    }

    this.cpAdminModel();
    this.generateMockController(models);
    this.addPolicies(models);

    this.copyBaseFiles();
    this.copyAuthFiles();
    this.unzipStaticFiles();
    this.updateConfigFile();

    if (!skip) { //忽略依赖添加
      this.exec();
    }

  }

  /**
   * 移除历史生成的项目，会移除控制器下admin文件夹等
   */
  private reset(): void {
    //重置需要删除的文件
    const files = [
      `${process.cwd()}/api/controllers/${this.folderName}/`,
      `${process.cwd()}/api/controllers/MockController.js`,
      `${process.cwd()}/api/controllers/StaticController.js`,
      `${process.cwd()}/api/policies/`,
      `${process.cwd()}/api/services/`,
      `${process.cwd()}/assets/admin/`,
      `${process.cwd()}/assets/layui/`,
      `${process.cwd()}/views/${this.folderName}/`
    ];
    for (let file of files) {
      fs.removeSync(file);
    }
  }

  /**
   * 创建生成代码存放的各级文件夹
   */
  private createFolder() {
    fs.ensureDirSync(`${process.cwd()}/views/${this.folderName}/`);
    fs.ensureDirSync(`${process.cwd()}/api/controllers/${this.folderName}/`);
    fs.ensureDirSync(`${process.cwd()}/api/services/`);
    fs.ensureDirSync(`${process.cwd()}/api/policies/`);
  }

  /**
   * 获取项目包含的model，剔除了基本的model
   * @returns string[] 包含的models
   */
  private getModels(): string[] {
    const files = fs.readdirSync(`${process.cwd()}/api/models/`);
    let models: string[] = [];
    for (let file of files) {
      if (file.endsWith('.js')) {
        let modelName = file.replace('.js', '');
        if (omit_models.indexOf(modelName) < 0) {
          models.push(modelName);
        }
      }
    }
    return models;
  }

  /**
   * 生成model的控制器和页面
   * @param fileName model的文件名
   */
  private generateModel(fileName: string) {
    console.log(colors.progress('正在创建模型的操作方法...'));
    let model = require(`${process.cwd()}/api/models/${fileName}`);
    let modelName = fileName.replace('.js', '');

    const common_attr = {
      id: {
        type: 'number',
        autoIncrement: true,
        primaryKey: true
      },
      deleted: {   //逻辑删除 0 正常  其他是已删除
        type: 'number',
        defaultsTo: 0,
        columnType: 'integer'
      },
      create_user: {    //创建人
        type: 'string',
        maxLength: 250,
        columnType: 'varchar(250)'
      },
      sorted_num: {   //排序号
        type: 'number',
        defaultsTo: 1,
        columnType: 'integer'
      }
    };  //通用字段
    model.attributes = Object.assign(model.attributes, common_attr);

    //得到主键的字段
    let primaryKey = null;
    for (let i in model.attributes) {
      let attr = model.attributes[i];
      if (attr['primaryKey']) {
        primaryKey = i;
        break;
      }
    }
    if (!primaryKey) {
      console.log(colors.warn(`model${modelName}没有设置主键，已忽略`));
    } else {
      if (omit_models.indexOf(modelName) < 0) { //权限相关的直接生产权限系统
        Worker.generateController(this.folderName, modelName, model, primaryKey);
        Worker.generateIndexPage(this.folderName, modelName, model, primaryKey);
        Worker.generateAddPage(this.folderName, modelName, model, primaryKey);
      }
    }
  }

  /**
   * 移动基础的model到项目中
   */
  private cpAdminModel() {
    const proRootPath = __dirname + '/..';
    const controllers = fs.readdirSync(proRootPath + '/templates/models');
    for (let controller of controllers) {
      if (controller.endsWith('.js')) {
        if (!fs.existsSync(`${process.cwd()}/api/models/${controller}`)) {
          console.log(colors.info('复制' + controller + '到models下'));
          let ps = proRootPath + '/templates/models/' + controller;
          fs.writeFileSync(process.cwd() + '/api/models/' + controller, fs.readFileSync(ps));
        } else {
          console.log(colors.warn('models下已经存在' + controller));
        }
      }
    }
  }

  /**
   * 生成mock控制器，包含add方法等
   * @param models 所有的model
   */
  private generateMockController(models: string[]) {
    let str = fs.readFileSync(__dirname + '/../templates/MockController.ejs');//读取控制器模板
    let controllerStr = ejs.render(str.toString(), {
      folderName: this.folderName,
      models: models
    });
    let path = `${process.cwd()}/api/controllers/`;
    fs.ensureDirSync(path);
    fs.writeFileSync(`${path}MockController.js`, new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log(colors.info('创建MockController'));
  }

  /**
   * 添加请求策略
   * @param models 所有的模型
   */
  private addPolicies(models: string[]) {
    let str = fs.readFileSync(__dirname + '/../templates/policies.ejs');  //读取policies模板
    let policiesStr = ejs.render(str.toString(), {
      folderName: this.folderName,
      models: models
    });
    let file_path = process.cwd() + '/config/policies.js';
    fs.writeFileSync(file_path, new Buffer(policiesStr), {flag: 'w', encoding: 'utf8'});
    console.log(colors.info('插入policies成功'));
  }

  /**
   * 复制基础文件到相关目录
   */
  private copyBaseFiles() {
    console.log(colors.progress('正在复制基础文件到项目...'));
    let proRootPath = __dirname + '/..';
    fs.writeFileSync(`${process.cwd()}/views/${this.folderName}/layout.ejs`,
      fs.readFileSync(`${proRootPath}/templates/layout.ejs`));                    //复制layout.ejs

    let policies = fs.readdirSync(proRootPath + '/templates/policies');
    for (let i in policies) {
      var folder = policies[i];
      if (folder.startsWith('.')) {
        continue;
      }
      fs.writeFileSync(process.cwd() + '/api/policies/' + folder,
        fs.readFileSync(proRootPath + '/templates/policies/' + folder));
    }

    let services = fs.readdirSync(proRootPath + '/templates/services');
    for (let i in services) {
      let folder = services[i];
      if (folder.startsWith('.')) {
        continue;
      }
      fs.writeFileSync(process.cwd() + '/api/services/' + folder,
        fs.readFileSync(proRootPath + '/templates/services/' + folder));
    }
    console.log(colors.success('复制基础文件到项目成功'));
  }

  /**
   * 复制权限的文件到项目中
   */
  private copyAuthFiles() {
    console.log(colors.progress('正在复制权限文件到项目...'));
    let proRootPath = __dirname + '/..';

    let controllers = fs.readdirSync(proRootPath + '/templates/auth/controllers');
    for (let i in controllers) {
      let controller = controllers[i];
      fs.writeFileSync(process.cwd() + '/api/controllers/' + this.folderName + '/' + controller,
        fs.readFileSync(proRootPath + '/templates/auth/controllers/' + controller));
    }

    fs.writeFileSync(process.cwd() + '/api/controllers/StaticController.js',
        fs.readFileSync(proRootPath + '/templates/others/StaticController.js'));

    let views = fs.readdirSync(proRootPath + '/templates/auth/views');
    for (let i in views) {
      let folder = views[i];
      if (folder.startsWith('.')) {
        continue;
      }
      let path = process.cwd() + '/views/' + this.folderName + '/' + folder;
      if (fs.existsSync(path)) {
      }
      else {
        fs.mkdirSync(path);
      }
      let files = fs.readdirSync(proRootPath + '/templates/auth/views/' + folder);
      for (let j in files) {
        let file = files[j];
        fs.writeFileSync(process.cwd() + '/views/' + this.folderName + '/' + folder + '/' + file,
          fs.readFileSync(proRootPath + '/templates/auth/views/' + folder + '/' + file));
      }
    }
    console.log(colors.success('复制权限文件到项目成功'));
  }

  /**
   * 解压静态资源文件
   */
  private unzipStaticFiles() {
    console.log(colors.progress('正在解压静态资源...'));
    fs.copySync(__dirname + '/..' + '/templates/assets', process.cwd() + '/assets/');
    console.log(colors.success('解压静态资源成功...'));
  }

  /**
   * 替换配置文件
   * @param {String} folderName 文件夹名
   */
  private updateConfigFile() {
    console.log(colors.progress('正在替换配置文件...'));
    let proRootPath = __dirname + '/..'; 
    let pp = proRootPath + '/templates/configs/';
    let op = process.cwd() + '/config/';
    let files = fs.readdirSync(pp);
    for (let i in files) {
      let file = files[i];
      if (file.endsWith('.js')) {
        fs.writeFileSync(op + file, fs.readFileSync(pp + file));
      }
    }
    console.log(colors.success('替换配置文件成功'));
  }

  /**
   * 执行shell脚本添加依赖
   */
  private exec() {
    console.log(colors.progress('添加项目依赖...'));
    let process = require('child_process');
    process.execSync('npm i axios --save');
    process.execSync('npm i gm --save');
    process.execSync('npm i moment --save');
    process.execSync('npm i nodemailer --save');
    process.execSync('npm i uuid --save');
    process.execSync('npm i fs-extra --save');
    process.execSync('npm i sails-mysql --save');
    process.execSync('npm i promise-queue-plus --save');
    console.log(colors.success('添加项目依赖成功'));
  }

}