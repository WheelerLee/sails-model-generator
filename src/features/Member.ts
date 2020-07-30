/**
 * 生成会员接口的功能
 * @Author: Wheeler
 * @Date: 2020-05-26 17:00:43
 */
import FileCopyFeature from "./FileCopyFeature";

export default class Member extends FileCopyFeature {

  name() {
    return 'member';
  }

  desc() {
    return '生成会员的注册登录，找回密码等接口';
  }

  resources() {
    return [
      
    ];
  }

}
