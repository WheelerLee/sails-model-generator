#!/usr/bin/env node

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var ejs = require('ejs');
var fs = require('fs');
var readline = require('readline');
var Generator = require('./Generator');

// fs.createReadStream('./templates/adminlte.zip').pipe(unzip2.Extract({ path: process.cwd() + '/assets/' }));

process.stdin.setEncoding('utf8');

// if (!fs.existsSync(process.cwd() + '/views/') || !fs.existsSync(process.cwd() + '/api/')
//   || !fs.existsSync(process.cwd() + '/api/controllers/') || !fs.existsSync(process.cwd() + '/api/models/')
//   || !fs.existsSync(process.cwd() + '/assets/') || !fs.existsSync(process.cwd() + '/config/')) {
//   console.log('Please run in sails project folder');
//   return;
// }

var folderName = 'admin';
var args = process.argv;
args.splice(0, 2);


var generate = function (fileName) {
  // var fileName = '/Article.js';
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
    console.log('\x1B[31m%s', 'model ' + modelName + ' has no primaryKey. Abandon');
  } else {

    // if ([].indexOf(modelName) < 0) {
    if (['Xt_user', 'Xt_resource', 'Xt_role', 'Xt_dict', 'Xt_role_resource', 'Xt_user_resource', 'Xt_user_role'].indexOf(modelName) < 0) {  //权限相关的直接生产权限系统
      console.log('\x1B[34m%s', 'generate the files for model ' + modelName);
      Generator.generateController(folderName, modelName, model, primaryKey);
      Generator.generateIndexPage(folderName, modelName, model, primaryKey);
      Generator.generateAddPage(folderName, modelName, model, primaryKey);
      // Generator.generateEditPage(folderName, modelName, model, primaryKey); //新版本添加和修改放在一起
    }

  }

};

/**
 * 生成model的增删改查
 */
function operation() {
  if (fs.existsSync(process.cwd() + '/views/' + folderName + '/') || fs.existsSync(process.cwd() + '/api/controllers/' + folderName + '/')) {
    console.log('\x1B[31m%s', 'Please check the controllers folder or the views folder, the ' + folderName + ' folder has exists');
  } else {
    var files = fs.readdirSync(process.cwd() + '/api/models/');
    var models = [];
    for (var i in files) {
      var file = files[i];
      if (file.endsWith('.js')) {
        generate(file);
        var modelName = file.replace('.js', '');
        if (['Xt_user', 'Xt_resource', 'Xt_role', 'Xt_dict', 'Xt_role_resource', 'Xt_user_resource', 'Xt_user_role'].indexOf(modelName) < 0) {
          models.push(modelName);
        }
      }
    }

    generateMockController(models);
    addPolicies(models);

  }
}

/**
 * 复制基础文件到相关目录
 */
function copyBaseFiles() {
  var proRootPath = __filename.replace('/bin/sails-model-generator.js', '')
    .replace('\\bin\\sails-model-generator.js', '');

  console.info('Copy layout to views');
  fs.writeFileSync(process.cwd() + '/views/' + folderName + '/layout.ejs',
    fs.readFileSync(proRootPath + '/templates/layout.ejs'));                    //复制layout.ejs

  console.info('Copy policy to policies');
  var policies = fs.readdirSync(proRootPath + '/templates/policies');
  for (var i in policies) {
    var folder = policies[i];
    if (folder.startsWith('.')) {
      continue;
    }
    fs.writeFileSync(process.cwd() + '/api/policies/' + folder,
      fs.readFileSync(proRootPath + '/templates/policies/' + folder));
  }

  console.info('Copy service to services');
  var services = fs.readdirSync(proRootPath + '/templates/services');
  for (var i in services) {
    var folder = services[i];
    if (folder.startsWith('.')) {
      continue;
    }
    fs.writeFileSync(process.cwd() + '/api/services/' + folder,
      fs.readFileSync(proRootPath + '/templates/services/' + folder));
  }
}

/**
 * 复制权限的文件到项目中
 */
function copyAuthFiles() {

  var proRootPath = __filename.replace('/bin/sails-model-generator.js', '')
    .replace('\\bin\\sails-model-generator.js', '');

  console.info('Copy permission controllers to controllers');
  var controllers = fs.readdirSync(proRootPath + '/templates/auth/controllers');
  for (var i in controllers) {
    var controller = controllers[i];
    fs.writeFileSync(process.cwd() + '/api/controllers/' + folderName + '/' + controller,
      fs.readFileSync(proRootPath + '/templates/auth/controllers/' + controller));
  }

  console.info('Copy permission views to views');
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

}

/**
 * 解压静态资源文件
 */
function unzipStaticFiles() {
  // var unzipParser = unzip2.Extract({path: process.cwd() + '/assets/' });
  // fs.createReadStream(__filename.replace('/bin/sails-model-generator.js', '').replace('\\bin\\sails-model-generator.js', '') + '/templates/assets.zip').pipe(unzipParser);
  // console.info('unzip static assets...');
  // unzipParser.on('finish', function () {
  //   console.info('unzip static assets successful');
  //   process.exit(0);
  // });

  // console.log(__filename.replace('/bin/sails-model-generator.js', '')
  //     .replace('\\bin\\sails-model-generator.js', '') + '/templates/assets');
  // console.log(process.cwd() + '/assets/');

  console.info('copy static assets...');
  copyDir(process.cwd() + '/assets/', __filename.replace('/bin/sails-model-generator.js', '')
      .replace('\\bin\\sails-model-generator.js', '') + '/templates/assets');

}

/**
 * 复制文件夹到指定目录
 * @param dst 指定目录
 * @param src 源文件夹
 */
function copyDir(dst, src) {

  var files = fs.readdirSync(src);
  for (var i in files) {

    var file = files[i];
    if (fs.statSync(src + '/' + file).isDirectory()) { //文件夹

      var path = dst + '/' + file;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      copyDir(path, src + '/' + file);

    } else { //普通文件，直接复制过来
      fs.writeFileSync(dst + '/' + file, fs.readFileSync(src + '/' + file));
    }

  }

}

/**
 * 生成添加默认数据的控制器
 */
function generateMockController(models) {

  var str = fs.readFileSync(__dirname + '/../templates/MockController.ejs');  //读取控制器模板
  var controllerStr = ejs.render(str.toString(), {
    folderName: folderName,
    models: models
  });

  var path = process.cwd() + '/api/controllers/';
  if (fs.existsSync(path)) {
  }
  else {
    fs.mkdirSync(path);
  }
  fs.writeFileSync(path + 'MockController.js',
    new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
  console.log('\x1B[32m%s', 'create MockController successful');

}

/**
 * 往policies.js文件添加相应的policies
 * @param models
 */
function addPolicies(models) {
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

  console.log('\x1B[32m%s', 'append policies successful');

}

//创建readline接口实例
var rl = readline.createInterface({input: process.stdin, output: process.stdout});

if (args.length === 0) {
  rl.question('Please input the prefix(admin): ', function (answer) {
    if (answer) {
      folderName = answer.toLowerCase();
    }

    operation();
    copyBaseFiles();
    copyAuthFiles();
    unzipStaticFiles();

    rl.close();
  });
} else {
  folderName = args[0].toLowerCase();
  operation();
  copyBaseFiles();
  copyAuthFiles();
  unzipStaticFiles();

  rl.close();
}

rl.on('close', function () {
});

return;