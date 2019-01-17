/**
 * 生成器的核心方法
 */
const colors = require('colors');
const fs = require('fs-extra');
const Generator = require('./Generator');
var ejs = require('ejs');

module.exports = function(folderName) {

  //开发环境移除测试项目的路径
  fs.removeSync(process.cwd() + '/api/controllers/' + folderName + '/');
  fs.removeSync(process.cwd() + '/api/controllers/MockController.js');
  fs.removeSync(process.cwd() + '/api/policies/');
  fs.removeSync(process.cwd() + '/api/services/');
  fs.removeSync(process.cwd() + '/assets/admin/');
  fs.removeSync(process.cwd() + '/assets/layui/');
  fs.removeSync(process.cwd() + '/views/' + folderName + '/');

  if (fs.existsSync(process.cwd() + '/views/' + folderName + '/') || fs.existsSync(process.cwd() + '/api/controllers/' + folderName + '/')) {
    console.log(colors.error('请检查controllers或views文件夹,' + folderName + '文件夹已经存在'));
    return;
  }

  createFolder(folderName);

  let models = getModels();
  for (let model of models) {
    generate(folderName, model);
  }
  generateMockController(folderName, models);
  addPolicies(folderName, models);

  copyBaseFiles(folderName);
  copyAuthFiles(folderName);
  unzipStaticFiles();

};

/**
 * 创建生成需要的路径
 * @param {String} folderName 文件夹名字
 */
function createFolder(folderName) {
  fs.ensureDirSync(process.cwd() + '/views/' + folderName + '/');                   //创建保存views的路径
  fs.ensureDirSync(process.cwd() + '/api/controllers/' + folderName + '/');         //创建保存控制器的路径
  fs.ensureDirSync(process.cwd() + '/api/services/');                               //创建保存service的路径
  fs.ensureDirSync(process.cwd() + '/api/policies/');                               //创建保存policie的路径
}

/**
 * 获取项目包含的所有model，不包含资源等内置model
 */
function getModels() {
  var files = fs.readdirSync(process.cwd() + '/api/models/');
  var models = [];
  for (var i in files) {
    var file = files[i];
    if (file.endsWith('.js')) {
      var modelName = file.replace('.js', '');
      if (['Xt_user', 'Xt_resource', 'Xt_role', 'Xt_dict', 'Xt_role_resource', 'Xt_user_resource', 'Xt_user_role'].indexOf(modelName) < 0) {
        models.push(modelName);
      }
    }
  }
  return models;
}

/**
 * 创建model的增删改查
 * @param {String} folderName 文件夹名
 * @param {String} fileName model名
 */
function generate (folderName, fileName) {

  console.log(colors.progress('正在创建模型的操作方法...'));
  var model = require(process.cwd() + '/api/models/' + fileName);
  var modelName = fileName.replace('.js', '');

  var common_attr = {
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
  var primaryKey = null;
  for (var i in model.attributes) {
    var attr = model.attributes[i];
    if (attr['primaryKey']) {
      primaryKey = i;
      break;
    }
  }

  if (!primaryKey) {
    console.log(colors.warn('model' + modelName + '没有设置主键，已忽略'));
  } else {
    if (['Xt_user', 'Xt_resource', 'Xt_role', 'Xt_dict', 'Xt_role_resource', 'Xt_user_resource', 'Xt_user_role'].indexOf(modelName) < 0) {  //权限相关的直接生产权限系统
      // console.log(colors.progress('Generate the files for model ' + modelName + '...'));
      Generator.generateController(folderName, modelName, model, primaryKey);
      Generator.generateIndexPage(folderName, modelName, model, primaryKey);
      Generator.generateAddPage(folderName, modelName, model, primaryKey);
    }
  }

};

/**
 * 生成添加默认数据的控制器
 * @param {String[]} models 模型数组
 */
function generateMockController(folderName, models) {

  var str = fs.readFileSync(__dirname + '/../templates/MockController.ejs');  //读取控制器模板
  var controllerStr = ejs.render(str.toString(), {
    folderName: folderName,
    models: models
  });

  var path = process.cwd() + '/api/controllers/';
  fs.ensureDirSync(path);
  fs.writeFileSync(path + 'MockController.js',
    new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
  console.log(colors.info('创建MockController'));

}

/**
 * 往policies.js文件添加相应的policies
 * @param {String} folderName 文件夹名
 * @param {String[]} models model数组
 */
function addPolicies(folderName, models) {
  var str = fs.readFileSync(__dirname + '/../templates/policies.ejs');  //读取控制器模板
  var policiesStr = ejs.render(str.toString(), {
    folderName: folderName,
    models: models
  });
  var file_path = process.cwd() + '/config/policies.js';

  var data = fs.readFileSync(file_path, 'utf8');

  var index = data.lastIndexOf('};');
  data = data.substr(0, index);

  data += policiesStr;
  data += '};';

  fs.writeFileSync(file_path, new Buffer(data), {flag: 'w', encoding: 'utf8'});

  console.log(colors.info('插入policies成功'));

}

/**
 * 复制基础文件到相关目录
 */
function copyBaseFiles(folderName) {
  console.log(colors.progress('正在复制基础文件到项目...'));
  var proRootPath = __dirname.replace('/bin', '')
    .replace('\\bin', '');
  fs.writeFileSync(process.cwd() + '/views/' + folderName + '/layout.ejs',
    fs.readFileSync(proRootPath + '/templates/layout.ejs'));                    //复制layout.ejs

  var policies = fs.readdirSync(proRootPath + '/templates/policies');
  for (var i in policies) {
    var folder = policies[i];
    if (folder.startsWith('.')) {
      continue;
    }
    fs.writeFileSync(process.cwd() + '/api/policies/' + folder,
      fs.readFileSync(proRootPath + '/templates/policies/' + folder));
  }

  var services = fs.readdirSync(proRootPath + '/templates/services');
  for (var i in services) {
    var folder = services[i];
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
function copyAuthFiles(folderName) {

  console.log(colors.progress('正在复制权限文件到项目...'));
  var proRootPath = __dirname.replace('/bin', '')
    .replace('\\bin', '');

  var controllers = fs.readdirSync(proRootPath + '/templates/auth/controllers');
  for (var i in controllers) {
    var controller = controllers[i];
    fs.writeFileSync(process.cwd() + '/api/controllers/' + folderName + '/' + controller,
      fs.readFileSync(proRootPath + '/templates/auth/controllers/' + controller));
  }

  var views = fs.readdirSync(proRootPath + '/templates/auth/views');
  for (var i in views) {
    var folder = views[i];
    if (folder.startsWith('.')) {
      continue;
    }
    var path = process.cwd() + '/views/' + folderName + '/' + folder;
    if (fs.existsSync(path)) {
    }
    else {
      fs.mkdirSync(path);
    }
    var files = fs.readdirSync(proRootPath + '/templates/auth/views/' + folder);
    for (var j in files) {
      var file = files[j];
      fs.writeFileSync(process.cwd() + '/views/' + folderName + '/' + folder + '/' + file,
        fs.readFileSync(proRootPath + '/templates/auth/views/' + folder + '/' + file));
    }
  }
  console.log(colors.success('复制权限文件到项目成功'));

}

/**
 * 解压静态资源文件
 */
function unzipStaticFiles() {

  console.log(colors.progress('正在解压静态资源...'));
  fs.copySync(__dirname.replace('/bin', '').replace('\\bin', '') + '/templates/assets', process.cwd() + '/assets/');
  console.log(colors.success('解压静态资源成功...'));

}