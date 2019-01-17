/**
 * Created by liwei on 2017/6/20.
 */

const colors = require('colors');
const fs = require('fs-extra');
const ejs = require('ejs');

module.exports = {

  /**
   * 生成控制器
   * @param folderName  //文件夹名
   * @param modelName   //模型名
   * @param model       //模型
   * @param primaryKey  //主键
   */
  generateController: function (folderName, modelName, model, primaryKey) {
    var str = fs.readFileSync(__dirname + '/../templates/Controller.ejs');  //读取控制器模板
    var controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });

    var path = process.cwd() + '/api/controllers/' + folderName + '/';
    fs.ensureDirSync(path);
    fs.writeFileSync(path + modelName + 'Controller.js',
      new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log(colors.info('创建 ' + path + modelName + 'Controller.js'));
  },

  /**
   * 生成数据页面
   * @param folderName 文件夹名
   * @param modelName  模型名
   * @param model      模型
   * @param primaryKey 主键
   */
  generateIndexPage: function (folderName, modelName, model, primaryKey) {
    var str = fs.readFileSync(__dirname + '/../templates/index.ejs');  //读取控制器模板
    var controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });

    var path = process.cwd() + '/views/' + folderName + '/' + modelName.toLowerCase() + '/';
    fs.ensureDirSync(path);
    fs.writeFileSync(path + 'index.ejs',
      new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log(colors.info('创建 ' + path + 'index.ejs'));
  },

  /**
   * 生成添加页面
   * @param folderName 文件夹名
   * @param modelName  模型名
   * @param model      模型
   * @param primaryKey 主键
   */
  generateAddPage: function (folderName, modelName, model, primaryKey) {
    var str = fs.readFileSync(__dirname + '/../templates/modify.ejs');  //读取控制器模板
    var controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });

    var path = process.cwd() + '/views/' + folderName + '/' + modelName.toLowerCase() + '/';
    fs.ensureDirSync(path);
    fs.writeFileSync(path + 'modify.ejs',
      new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log(colors.info('创建 ' + path + 'modify.ejs'));
  },

  /**
   * 生成修改页面
   * @param folderName 文件夹名
   * @param modelName  模型名
   * @param model      模型
   * @param primaryKey 主键
   */
  generateEditPage: function (folderName, modelName, model, primaryKey) {
    var str = fs.readFileSync(__dirname + '/../templates/edit.ejs');  //读取控制器模板
    var controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });

    var path = process.cwd() + '/views/' + folderName + '/' + modelName.toLowerCase() + '/';
    fs.ensureDirSync(path);
    fs.writeFileSync(path + '/edit.ejs',
      new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log(colors.info('create ' + path + ' successful'));
  }

};