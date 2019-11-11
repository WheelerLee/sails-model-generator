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
import ora, { Ora } from 'ora';

const omit_models = [
  'Attach', 'Xt_user', 'Xt_resource', 'Xt_role', 'Xt_dict', 'Xt_role_resource', 
  'Xt_user_resource', 'Xt_user_role', 'Xt_setting', 'Msg_send_record', 'Msg_message'
]; //需要忽略的模型

interface Command {
  name: string,
  exec: string
}

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
  async generate(reset: boolean, skip: boolean) {

    //是否需要重置
    if (reset) this.reset();
  
    //检查是否创建的位置已经存在文件
    if (fs.existsSync(`${process.cwd()}/views/${this.folderName}/`) || fs.existsSync(`${process.cwd()}/api/controllers/${this.folderName}/`)) {
      console.log(colors.red.bold(`请检查controllers或views文件夹, ${this.folderName}文件夹已经存在`));
      return;
    }

    const spinner: Ora = ora('生成代码').start();

    await this.createFolder();
    let models = await this.getModels();
    for (let model of models) {
      await this.generateModel(model);
    }

    await this.cpAdminModel();
    await this.generateMockController(models);
    await this.addPolicies(models);

    await this.copyBaseFiles();
    await this.copyAuthFiles();
    await this.unzipStaticFiles();
    await this.updateConfigFile();
    spinner.succeed('生成代码');

    if (!skip) { //忽略依赖添加
      await this.exec();
    }

    spinner.stopAndPersist({
      text: '代码生成成功，运行后请访问 http://127.0.0.1:1337/mock/add 添加基础数据'
    });
    
    // this.core(skip).then((a) => {
    //   spinner.succeed('代码生成成功，运行后请访问 http://127.0.0.1:1337/mock/add 添加基础数据\n');
    // });
    
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
    return Promise.all([
      fs.ensureDirSync(`${process.cwd()}/views/${this.folderName}/`),
      fs.ensureDirSync(`${process.cwd()}/api/controllers/${this.folderName}/`),
      fs.ensureDirSync(`${process.cwd()}/api/services/`),
      fs.ensureDirSync(`${process.cwd()}/api/policies/`)
    ]);
  }

  /**
   * 获取项目包含的model，剔除了基本的model
   * @returns string[] 包含的models
   */
  private getModels(): Promise<string[]> {
    return fs.readdir(`${process.cwd()}/api/models/`).then(files => {
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
    });
  }

  /**
   * 生成model的控制器和页面
   * @param fileName model的文件名
   */
  private async generateModel(fileName: string) {
    // console.log(colors.progress('正在创建模型的操作方法...'));
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
        await Worker.generateController(this.folderName, modelName, model, primaryKey);
        await Worker.generateIndexPage(this.folderName, modelName, model, primaryKey);
        await Worker.generateAddPage(this.folderName, modelName, model, primaryKey);
      }
    }
  }

  /**
   * 移动基础的model到项目中
   */
  private async cpAdminModel() {
    const proRootPath = __dirname + '/..';
    const controllers = await fs.readdir(proRootPath + '/templates/models');
    for (let controller of controllers) {
      if (controller.endsWith('.js')) {
        if (!(await fs.pathExists(`${process.cwd()}/api/models/${controller}`))) {
          // console.log(colors.info('复制' + controller + '到models下'));
          let ps = proRootPath + '/templates/models/' + controller;
          await fs.writeFile(process.cwd() + '/api/models/' + controller, await fs.readFile(ps));
        } else {
          // console.log(colors.warn('models下已经存在' + controller));
        }
      }
    }
  }

  /**
   * 生成mock控制器，包含add方法等
   * @param models 所有的model
   */
  private async generateMockController(models: string[]) {
    let str = await fs.readFile(__dirname + '/../templates/MockController.ejs');//读取控制器模板
    let controllerStr = ejs.render(str.toString(), {
      folderName: this.folderName,
      models: models
    });
    let path = `${process.cwd()}/api/controllers/`;
    await fs.ensureDir(path);
    await fs.writeFile(`${path}MockController.js`, Buffer.from(controllerStr), {flag: 'w', encoding: 'utf8'});
    // console.log(colors.info('创建MockController'));
  }

  /**
   * 添加请求策略
   * @param models 所有的模型
   */
  private async addPolicies(models: string[]) {
    let str = await fs.readFile(__dirname + '/../templates/policies.ejs');  //读取policies模板
    let policiesStr = ejs.render(str.toString(), {
      folderName: this.folderName,
      models: models
    });
    let file_path = process.cwd() + '/config/policies.js';
    await fs.writeFile(file_path, Buffer.from(policiesStr), {flag: 'w', encoding: 'utf8'});
    // console.log(colors.info('插入policies成功'));
  }

  /**
   * 复制基础文件到相关目录
   */
  private async copyBaseFiles() {
    // console.log(colors.progress('正在复制基础文件到项目...'));
    let proRootPath = __dirname + '/..';
    await fs.writeFile(`${process.cwd()}/views/${this.folderName}/layout.ejs`,
      await fs.readFile(`${proRootPath}/templates/layout.ejs`));                    //复制layout.ejs

    let policies = await fs.readdir(proRootPath + '/templates/policies');
    for (let i in policies) {
      var folder = policies[i];
      if (folder.startsWith('.')) {
        continue;
      }
      await fs.writeFile(process.cwd() + '/api/policies/' + folder,
        await fs.readFile(proRootPath + '/templates/policies/' + folder));
    }

    let services = await fs.readdir(proRootPath + '/templates/services');
    for (let i in services) {
      let folder = services[i];
      if (folder.startsWith('.')) {
        continue;
      }
      await fs.writeFile(process.cwd() + '/api/services/' + folder,
        await fs.readFile(proRootPath + '/templates/services/' + folder));
    }
    // console.log(colors.success('复制基础文件到项目成功'));
  }

  /**
   * 复制权限的文件到项目中
   */
  private async copyAuthFiles() {
    // console.log(colors.progress('正在复制权限文件到项目...'));
    let proRootPath = __dirname + '/..';

    let controllers = await fs.readdir(proRootPath + '/templates/auth/controllers');
    for (let i in controllers) {
      let controller = controllers[i];
      await fs.writeFile(process.cwd() + '/api/controllers/' + this.folderName + '/' + controller,
        await fs.readFile(proRootPath + '/templates/auth/controllers/' + controller));
    }

    await fs.writeFile(process.cwd() + '/api/controllers/StaticController.js',
      await fs.readFile(proRootPath + '/templates/others/StaticController.js'));

    let views = await fs.readdir(proRootPath + '/templates/auth/views');
    for (let i in views) {
      let folder = views[i];
      if (folder.startsWith('.')) {
        continue;
      }
      let path = process.cwd() + '/views/' + this.folderName + '/' + folder;
      if (await fs.pathExists(path)) {
      }
      else {
        await fs.mkdir(path);
      }
      let files = await fs.readdir(proRootPath + '/templates/auth/views/' + folder);
      for (let j in files) {
        let file = files[j];
        await fs.writeFile(process.cwd() + '/views/' + this.folderName + '/' + folder + '/' + file,
          await fs.readFile(proRootPath + '/templates/auth/views/' + folder + '/' + file));
      }
    }
    // console.log(colors.success('复制权限文件到项目成功'));
  }

  /**
   * 解压静态资源文件
   */
  private unzipStaticFiles() {
    // console.log(colors.progress('正在解压静态资源...'));
    return fs.copy(__dirname + '/..' + '/templates/assets', process.cwd() + '/assets/');
    // console.log(colors.success('解压静态资源成功...'));
  }

  /**
   * 替换配置文件
   * @param {String} folderName 文件夹名
   */
  private async updateConfigFile() {
    // console.log(colors.progress('正在替换配置文件...'));
    let proRootPath = __dirname + '/..'; 
    let pp = proRootPath + '/templates/configs/';
    let op = process.cwd() + '/config/';
    let files = await fs.readdir(pp);
    for (let i in files) {
      let file = files[i];
      if (file.endsWith('.js')) {
        await fs.writeFile(op + file, fs.readFileSync(pp + file));
      }
    }
    // console.log(colors.success('替换配置文件成功'));
  }

  /**
   * 执行shell脚本添加依赖
   */
  private async exec() {
    // console.log(colors.progress('添加项目依赖...'));
    // const spinner = ora('添加项目依赖\n').start();
    const spinner = ora('添加项目依赖').start();
    let list: Command[] = require('../templates/command.json').list;
    for (let command of list) {
      spinner.text = '添加项目依赖: ' + command.name;
      await this.execPromise(command);
    }
    spinner.succeed('添加项目依赖');
  }

  private execPromise(command: Command) {
    return new Promise(function(resolve, reject) {
      let process = require('child_process');
      process.exec(command.exec, function() {
        resolve(true);
      });
    });
  }

}