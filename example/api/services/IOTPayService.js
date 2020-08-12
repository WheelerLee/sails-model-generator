/**
 * IOT Pay
 * 此代码由生成器生成，如有问题，请联系作者 https://github.com/wheelerlee
 */
const axios = require('axios');
const querystring = require('querystring');
const uuid = require('uuid');

module.exports = {

  /**
   * 统一下单
   * @param {String} channelId 渠道ID WX_APP:微信 ALIPAY_MOBILE:支付宝  参考：https://develop.iotpay.ca/zh/codeid.html
   * @param {int} amount 支付金额，单位是分(CAD)
   * @param {String} ip 客户端IP地址
   * @param {String} subject 商品主题
   * @param {String} body 商品描述信息
   * @param {String} param1 支付中心回调时会原样返回
   * @param {String} notifyUrl 支付结果回调URL,勿包含？
   */
  pay: async function (channelId, amount, ip, subject, body, param1, notifyUrl) {
    if (!sails.settings.iot_settings) {
      sails.log.error('请先设置IOT Pay的相关参数，才能正常使用IOT Pay的服务。添加iot_settings，包含mchId,jobNo,key以及wxappId四个字段');
      return false;
    }
    let params = {
      mchId: sails.settings.iot_settings.mchId,
      mchOrderNo: uuid.v4(),
      channelId: channelId,
      currency: 'CAD',
      amount: amount,
      clientIp: ip,
      notifyUrl: notifyUrl,
      subject: subject,
      body: body,
      jobNo: sails.settings.iot_settings.jobNo
    };
    if (channelId === 'WX_APP') {
      params.extra = JSON.stringify({ "type": "apppay", "appId": sails.settings.iot_settings.wxappId });
    }
    if (param1) {
      params.param1 = param1;
    }

    let sign = IOTPayService.generateSign(params);
    params.sign = sign;
    
    const response = await axios({
      method: 'post',
      url: 'https://api.iotpaycloud.com/v1/create_order',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: querystring.stringify({ params: JSON.stringify(params) })
    });

    if (response.status === 200) {
      const data = response.data;
      if (data.resCode === 'SUCCESS' && data.retCode === 'SUCCESS') {
        return data;
      }
    }
    return false;

  },

  /**
   * 生成iot接口需要的签名
   * @param {Json}} params 生成签名所用的参数
   */
  generateSign: function (params) {
    let keys = Object.keys(params);
    keys.sort(function (a, b) {
      return a > b ? 1 : -1;
    });  //将name字段从小到大排序
    let values = [];
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (key !== 'sign' && params[key] && params[key] !== null && params[key] !== undefined) {
        values.push(key + '=' + params[key]);
      }
    }
    let str = values.join('&');
    str += ('&key=' + sails.settings.iot_settings.key);
    let sign = DigestService.md5(str).toUpperCase();

    return sign;
  }

};
