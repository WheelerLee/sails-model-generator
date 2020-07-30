/**
 * @Author: your name
 * @Date: 2020-05-26 17:04:14
 * @LastEditTime: 2020-05-27 13:56:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /sails-model-generator/src/FeatureUtils.ts
 */ 
import fs from 'fs-extra';
import path from 'path';
import colors from 'colors';
import FeatureAdapter from 'features/FeatureAdapter';

export default class FeatureUtils {

  static features: any = {};
  static feature_desc: any[] = [];

  /**
   * 添加功能模块
   * @param name 功能模块的名称
   */
  static addFeature(name: string) {
    if (FeatureUtils.features[name]) {
      let feature: FeatureAdapter = FeatureUtils.features[name];
      feature.generate();
    } else {
      console.log(colors.error(`不存在功能“${name}”，请检查输入是否正确`));
    }
  }

  /**
   * 打印所有的功能模块
   */
  static printFeatures() {
    console.table(this.feature_desc);
  }

  /**
   * 自动将feature注册到系统中
   */
  static autoLink() {
    let features_dir = path.join(__dirname, 'features');
    let files = fs.readdirSync(features_dir);
    for (let filename of files) {
      let file = path.join(features_dir, filename);
      let basename = path.basename(file, '.js');
      let Feature = require(`./features/${basename}`).default;
      let feature = new Feature();
      if (feature.name && feature.name()) {
        FeatureUtils.features[feature.name()] = feature;
        FeatureUtils.feature_desc.push({
          name: feature.name(),
          desc: feature.desc()
        });
      }
    }
  }

}