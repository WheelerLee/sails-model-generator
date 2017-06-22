/**
 * Created by liwei on 2017/6/20.
 */

var fs = require('fs');
var ejs = require('ejs');

module.exports = {

  /**
   * 生成控制器
   * @param folderName  //文件夹名
   * @param modelName   //模型名
   * @param model       //模型
   * @param primaryKey  //主键
   */
  generateController: function (folderName, modelName, model, primaryKey) {
    var str = fs.readFileSync('./templates/Controller.ejs');  //读取控制器模板
    var controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });

    var path = process.cwd() + '/api/controllers/' + folderName + '/';
    if (fs.existsSync(path)) {
    }
    else {
      fs.mkdirSync(path);
    }
    fs.writeFileSync(path + modelName + 'Controller.js',
      new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log('create ' + path + ' successful');
  },

  /**
   * 生成数据页面
   * @param folderName 文件夹名
   * @param modelName  模型名
   * @param model      模型
   * @param primaryKey 主键
   */
  generateIndexPage: function (folderName, modelName, model, primaryKey) {
    var str = fs.readFileSync('./templates/index.ejs');  //读取控制器模板
    var controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });

    var path = process.cwd() + '/views/' + folderName + '/';
    if (fs.existsSync(path)) {}
    else {
      fs.mkdirSync(path);
    }
    path = path + modelName.toLowerCase() + '/';
    if (fs.existsSync(path)) {}
    else {
      fs.mkdirSync(path);
    }
    fs.writeFileSync(path + '/index.ejs',
      new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log('create ' + path + ' successful');
  },

  /**
   * 生成添加页面
   * @param folderName 文件夹名
   * @param modelName  模型名
   * @param model      模型
   * @param primaryKey 主键
   */
  generateAddPage: function (folderName, modelName, model, primaryKey) {
    var str = fs.readFileSync('./templates/add.ejs');  //读取控制器模板
    var controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });

    var path = process.cwd() + '/views/' + folderName + '/';
    if (fs.existsSync(path)) {}
    else {
      fs.mkdirSync(path);
    }
    path = path + modelName.toLowerCase() + '/';
    if (fs.existsSync(path)) {}
    else {
      fs.mkdirSync(path);
    }
    fs.writeFileSync(path + '/add.ejs',
      new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log('create ' + path + ' successful');
  },

  /**
   * 生成修改页面
   * @param folderName 文件夹名
   * @param modelName  模型名
   * @param model      模型
   * @param primaryKey 主键
   */
  generateEditPage: function (folderName, modelName, model, primaryKey) {
    var str = fs.readFileSync('./templates/edit.ejs');  //读取控制器模板
    var controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });

    var path = process.cwd() + '/views/' + folderName + '/';
    if (fs.existsSync(path)) {}
    else {
      fs.mkdirSync(path);
    }
    path = path + modelName.toLowerCase() + '/';
    if (fs.existsSync(path)) {}
    else {
      fs.mkdirSync(path);
    }
    fs.writeFileSync(path + '/edit.ejs',
      new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log('create ' + path + ' successful');
  }

};