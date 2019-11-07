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
  static async generateController(folderName: string, modelName: string, model: string, primaryKey: string) {
    let str = await fs.readFile(__dirname + '/../templates/Controller.ejs');  //读取控制器模板
    let controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });
    let path = process.cwd() + '/api/controllers/' + folderName + '/';
    await fs.ensureDir(path);
    await fs.writeFile(path + modelName + 'Controller.js', Buffer.from(controllerStr), {flag: 'w', encoding: 'utf8'});
    // console.log(colors.info('创建 ' + path + modelName + 'Controller.js'));
    return true;
  }

  /**
   * 生成数据页面
   * @param folderName 文件夹名
   * @param modelName  模型名
   * @param model      模型
   * @param primaryKey 主键
   */
  static async generateIndexPage(folderName: string, modelName: string, model: string, primaryKey: string) {
    let str = await fs.readFile(__dirname + '/../templates/index.ejs');  //读取控制器模板
    let controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });
    let path = process.cwd() + '/views/' + folderName + '/' + modelName.toLowerCase() + '/';
    await fs.ensureDir(path);
    await fs.writeFile(path + 'index.ejs', Buffer.from(controllerStr), {flag: 'w', encoding: 'utf8'});
    // console.log(colors.info('创建 ' + path + 'index.ejs'));
    return true;
  }

  /**
   * 生成添加页面
   * @param folderName 文件夹名
   * @param modelName  模型名
   * @param model      模型
   * @param primaryKey 主键
   */
  static async generateAddPage(folderName: string, modelName: string, model: string, primaryKey: string) {
    let str = await fs.readFile(__dirname + '/../templates/modify.ejs');  //读取控制器模板
    let controllerStr = ejs.render(str.toString(), {
      folderName: folderName,
      modelName: modelName,
      model: model,
      primaryKey: primaryKey
    });
    let path = process.cwd() + '/views/' + folderName + '/' + modelName.toLowerCase() + '/';
    await fs.ensureDir(path);
    await fs.writeFile(path + 'modify.ejs', Buffer.from(controllerStr), {flag: 'w', encoding: 'utf8'});
    // console.log(colors.info('创建 ' + path + 'modify.ejs'));
    return true;
  }

}