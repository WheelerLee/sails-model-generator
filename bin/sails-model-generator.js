#!/usr/bin/env node

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var ejs = require('ejs');
var fs = require('fs');
var unzip2 = require('unzip2');
var readline = require('readline');
var Generator = require('./Generator');

// fs.createReadStream('./templates/adminlte.zip').pipe(unzip2.Extract({ path: process.cwd() + '/assets/' }));

process.stdin.setEncoding('utf8');

if (!fs.existsSync(process.cwd() + '/views/') || !fs.existsSync(process.cwd() + '/api/')
  || !fs.existsSync(process.cwd() + '/api/controllers/') || !fs.existsSync(process.cwd() + '/api/models/')
  || !fs.existsSync(process.cwd() + '/assets/') || !fs.existsSync(process.cwd() + '/config/')) {
  console.log('Please run in sails project folder');
  return;
}

var folderName = 'wladmin';
var args = process.argv;
args.splice(0, 2);


var generate = function (fileName) {
  // var fileName = '/Article.js';
  var model = require(process.cwd() + '/api/models/' + fileName);
  var modelName = fileName.replace('.js', '');

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
    console.log('model ' + modelName + ' has no primaryKey. Abandon');
  } else {

    if (['Xt_user', 'Xt_resources', 'Xt_role', 'Xt_role_resources', 'Xt_user_resources', 'Xt_user_role'].indexOf(modelName) < 0) {  //权限相关的直接生产权限系统
      console.log('generate the files for model ' + modelName);
      Generator.generateController(folderName, modelName, model, primaryKey);
      Generator.generateIndexPage(folderName, modelName, model, primaryKey);
      Generator.generateAddPage(folderName, modelName, model, primaryKey);
      // Generator.generateEditPage(folderName, modelName, model, primaryKey); //新版本添加和修改放在一起
    }

  }

};

/**
 * 生成model的增删改查s
 */
function operation() {
  if (fs.existsSync(process.cwd() + '/views/' + folderName + '/') || fs.existsSync(process.cwd() + '/api/controllers/' + folderName + '/')) {
    console.log('Please check the controllers folder or the views folder, the ' + folderName + ' folder has exists');
  } else {
    var files = fs.readdirSync(process.cwd() + '/api/models/');
    for (var i in files) {
      var file = files[i];
      if (file.endsWith('.js')) {
        generate(file);
      }
    }
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
  fs.writeFileSync(process.cwd() + '/api/policies/adminAuth.js',
    fs.readFileSync(proRootPath + '/templates/policies/adminAuth.js'));         //复制adminAuth.js
  fs.writeFileSync(process.cwd() + '/api/policies/permissionsAuth.js',
    fs.readFileSync(proRootPath + '/templates/policies/permissionsAuth.js'));   //复制permissionsAuth.js

  console.info('Copy service to services');
  fs.writeFileSync(process.cwd() + '/api/services/DigestService.js',
    fs.readFileSync(proRootPath + '/templates/services/DigestService.js'));     //DigestService.js
  fs.writeFileSync(process.cwd() + '/api/services/PasswordService.js',
    fs.readFileSync(proRootPath + '/templates/services/PasswordService.js'));   //PasswordService.js
  fs.writeFileSync(process.cwd() + '/api/services/PermissionService.js',
    fs.readFileSync(proRootPath + '/templates/services/PermissionService.js')); //PermissionService.js
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
    var path = process.cwd() + '/views/' + folderName + '/' + folder;
    if (fs.existsSync(path)) {}
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
  var unzipParser = unzip2.Extract({path: process.cwd() + '/assets/' });
  fs.createReadStream(__filename.replace('/bin/sails-model-generator.js', '').replace('\\bin\\sails-model-generator.js', '') + '/templates/assets.zip').pipe(unzipParser);
  console.info('unzip static assets...');
  unzipParser.on('finish', function () {
    console.info('unzip static assets successful');
    process.exit(0);
  });
}

//创建readline接口实例
var rl = readline.createInterface({input: process.stdin, output: process.stdout});

if (args.length === 0) {
  rl.question('Please input the prefix(wladmin): ', function(answer) {
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

rl.on('close', function() {});

return;