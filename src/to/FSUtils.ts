/**
 * 文件操作
 * Created at 2020-10-15 19:54
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */
import path from 'path';
import fs from "fs-extra";
import colors from 'colors';
import ejs from 'ejs';

export default class FSUtils {
  /**
   * 复制types文件到项目
   */
  static async copyTypes() {
    await fs.copy(path.resolve(__dirname, '../../templates/to/@types'),
      path.resolve(process.cwd(), '@types'));
    if (await fs.pathExists(path.resolve(process.cwd(), 'tsconfig.json'))) {
      console.log(colors.warn('tsconfig.json已经存在，不会生成新的文件'));
    } else {
      await fs.copy(path.resolve(__dirname, '../../templates/to/tsconfig.json'),
        path.resolve(process.cwd(), 'tsconfig.json'));
    }
  }
  
  /**
   * 将源文件翻译成目标代码文件
   * @param source 源文件
   * @param target 目标代码文件(可执行的代码)
   * @param data 额外数据
   */
  static async translate(source: string, target: string, data: any) {
    const template = await fs.readFile(source);
    const model = ejs.render(template.toString(), data);
    await fs.writeFile(target, Buffer.from(model), { flag: 'w', encoding: 'utf8' });
  }
}
