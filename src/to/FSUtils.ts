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
}
