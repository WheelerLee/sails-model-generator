/**
 * App版本管理的功能模块
 * @Author: Wheeler
 * @Date: 2020-05-26 17:00:43
 * @FilePath: /sails-model-generator/src/features/AppVersion.ts
 */ 
import FeatureAdapter from "./FeatureAdapter";
import fs from 'fs-extra';
import path from 'path';

export default class AppVersion extends FeatureAdapter {

  name() {
    return 'app_version';
  }

  generate() {
    fs.copySync(path.join(__dirname, `../../templates/features/${this.name()}`), 
      process.cwd(), {
        overwrite: false
      });
  }

}

// module.exports = {
//   add: () => {
//     console.log('add');
//   }
// };
