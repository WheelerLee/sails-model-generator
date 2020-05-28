/**
 * 如果添加的模块只需要拷贝文件，那么继承该类就可以了
 * @Author: Wheeler
 * @Date: 2020-05-26 17:00:43
 * @FilePath: /sails-model-generator/src/features/FileCopyFeature.ts
 */
import FeatureAdapter from "./FeatureAdapter";
import fs from 'fs-extra';
import path from 'path';
import colors from 'colors';
import FSUtils from "../FSUtils";

export default abstract class FileCopyFeature extends FeatureAdapter {

  /**
   * 需要往权限系统添加的资源
   */
  abstract resources(): string[];

  generate() {
    let dir = path.join(__dirname, `../../templates/features/${this.name()}`);
    let files = FSUtils.getFiles(dir);
    let existsFiles: string[] = [];
    for (let file of files) {
      let f = file.replace(dir, '');
      let exists = fs.existsSync(path.join(process.cwd(), f));
      if (exists) {
        existsFiles.push(f);
      }
    }
    if (existsFiles.length > 0) {
      return console.log(colors.error('以下文件已经存在，请检查。\n' + existsFiles.join('\n')));
    }
    fs.copySync(dir, process.cwd());
    console.log(colors.success('添加成功，以下文件已经添加到项目中:\n' + files.join('\n')));

    if (this.resources().length > 0) {    //需要添加权限
      console.log(colors.info('请将以下权限添加到系统中:\n' + this.resources().join('\n')));
    }

  }

}