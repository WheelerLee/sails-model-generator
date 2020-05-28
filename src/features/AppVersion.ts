/**
 * App版本管理的功能模块
 * @Author: Wheeler
 * @Date: 2020-05-26 17:00:43
 * @FilePath: /sails-model-generator/src/features/AppVersion.ts
 */
import FileCopyFeature from "./FileCopyFeature";

export default class AppVersion extends FileCopyFeature {

  name() {
    return 'app_version';
  }

  resources() {
    return [
      '/admin/xt_app_version/index APP版本管理 page',
      '/admin/xt_app_version/modify 版本修改 button',
      '/admin/xt_app_version/delete 版本删除 button'
    ];
  }

}
