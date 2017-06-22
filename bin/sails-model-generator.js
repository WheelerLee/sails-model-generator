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
    console.log('generate the files for model ' + modelName);
    Generator.generateController(folderName, modelName, model, primaryKey);
    Generator.generateIndexPage(folderName, modelName, model, primaryKey);
    Generator.generateAddPage(folderName, modelName, model, primaryKey);
    Generator.generateEditPage(folderName, modelName, model, primaryKey);
  }

};

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

function unzipStaticFiles() {
  var unzipParser = unzip2.Extract({ path: process.cwd() + '/assets/' });
  fs.createReadStream('./templates/adminlte.zip').pipe(unzipParser);
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
      folderName = answer;
    }

    operation();
    unzipStaticFiles();

    rl.close();
  });
} else {
  folderName = args[0];
  operation();
  unzipStaticFiles();

  rl.close();
}

rl.on('close', function() {});

return;