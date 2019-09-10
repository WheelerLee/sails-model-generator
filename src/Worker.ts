/**
 * model控制器和页面生成的基本类
 * 2019-09-10 14:47.
 *
 * @author WheelerLee https://github.com/WheelerLee
 * @copyright 2019 
 */
import fs from 'fs-extra';
import ejs from 'ejs';
import colors from 'colors';

export default class Worker {

  /**
   * 生成控制器
   * @param folderName 文件夹名
   * @param modelName 模型名
   * @param model 模型
   * @param primaryKey 主键
   */
  static generateController(folderName: string, modelName: string, model: string, primaryKey: string) {
    let str = fs.readFileSync(__dirname + '/../templates/Controller.ejs');  //读取控制器模板
    let controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });

    let path = process.cwd() + '/api/controllers/' + folderName + '/';
    fs.ensureDirSync(path);
    fs.writeFileSync(path + modelName + 'Controller.js', new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log(colors.info('创建 ' + path + modelName + 'Controller.js'));
  }

  /**
   * 生成数据页面
   * @param folderName 文件夹名
   * @param modelName  模型名
   * @param model      模型
   * @param primaryKey 主键
   */
  static generateIndexPage(folderName: string, modelName: string, model: string, primaryKey: string) {
    let str = fs.readFileSync(__dirname + '/../templates/index.ejs');  //读取控制器模板
    let controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });
    let path = process.cwd() + '/views/' + folderName + '/' + modelName.toLowerCase() + '/';
    fs.ensureDirSync(path);
    fs.writeFileSync(path + 'index.ejs', new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log(colors.info('创建 ' + path + 'index.ejs'));
  }

  /**
   * 生成添加页面
   * @param folderName 文件夹名
   * @param modelName  模型名
   * @param model      模型
   * @param primaryKey 主键
   */
  static generateAddPage(folderName: string, modelName: string, model: string, primaryKey: string) {
    let str = fs.readFileSync(__dirname + '/../templates/modify.ejs');  //读取控制器模板
    let controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });
    let path = process.cwd() + '/views/' + folderName + '/' + modelName.toLowerCase() + '/';
    fs.ensureDirSync(path);
    fs.writeFileSync(path + 'modify.ejs', new Buffer(controllerStr), {flag: 'w', encoding: 'utf8'});
    console.log(colors.info('创建 ' + path + 'modify.ejs'));
  }

}