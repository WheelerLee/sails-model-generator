/**
 * IOT以及Stripe支付
 * @Author: Wheeler
 * @Date: 2020年08月12日14:50:33
 * @FilePath: /sails-model-generator/src/features/Pay.ts
 */
import FileCopyFeature from "./FileCopyFeature";

export default class Pay extends FileCopyFeature {

  name() {
    return 'pay';
  }

  desc() {
    return '生成IOT以及Stripe支付相关的接口';
  }

  resources() {
    return [
      
    ];
  }

}
