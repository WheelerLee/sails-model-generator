/**
 * IOT 支付的控制器
 * 此代码由生成器生成，如有问题，请联系作者 https://github.com/wheelerlee
 */
const Joi = require('@hapi/joi');

module.exports = {

  /**
   * @api {post} /api/iotpay/create_order 统一下单
   * @apiGroup Pay
   * @apiVersion 1.0.0
   * 
   * @apiDescription 业务通过统一下单接口可以发起任意三方支付(微信支付宝支付系统)渠道的支付订单。
   * 业务系统不必关心该如何调用三方支付，统一下单接口会根据业务系统选择的支付渠道ID，选择对应支付渠道的支付产品，
   * 发起下单请求，然后响应给业务系统支付请求所需参数。
   * 
   * @apiParam {int} amount 充值的金额，单位是加拿大分
   * @apiParam {string} member_id 需要充值的会员ID
   * @apiParam {string="WX_APP","ALIPAY_MOBILE"} channel 支付渠道ID。WX_APP：微信APP支付，ALIPAY_MOBILE：支付宝APP支付
   * 
   * @apiSuccess {int} errCode 0：成功，1：失败
   * @apiSuccess {String} msg 返回信息
   * @apiSuccess {Object} data 统一下单返回的所有数据
   * @apiSuccess {Object|String} data.payParams 调起微信或者支付宝支付需要的参数，支付宝是String，微信是包含所有数据的Object
   * @apiSuccess {String} data.mchOrderNo 平台订单号
   * @apiSuccess {String} data.payOrderId 第三方支付订单号
   * 
   */
  create_order: async function(req, res) {
    
    let amount = parseInt(req.param('amount'));
    let member_id = req.param('member_id');
    let channel = req.param('channel');

    const schema = Joi.object({
      amount: Joi.number().integer().required(),
      member_id: Joi.number().integer().required(),
      channel: Joi.string().valid('WX_APP', 'ALIPAY_MOBILE').required()
    });

    let data = schema.validate({
      amount: amount,
      member_id: member_id,
      channel: channel
    });
    if (data.error) { //验证不通过，直接返回错误就可以了，因为前端有验证
      return res.json({
        errCode: 1,
        data: data.error
      });
    }

    let result = await sails.getDatastore().transaction(async function (db) {
      let iotResult = await IOTPayService.pay(channel, data.value.amount, req.ip, 
        'Recharge', `Member ${data.value.member_id} recharge ${data.value.amount}c`, '', 
        `${req.protocol}://${req.hostname}/api/iotpay/notify`);
      await Pay_recharge.create({
        member: data.value.member_id,
        type: channel === 'WX_APP' ? 1 : 2,
        amount: data.value.amount,
        status: 2,
        mch_order_no: iotResult.mchOrderNo,
        pay_order_no: iotResult.payOrderId
      }).usingConnection(db);
      return iotResult;
    });
    
    if (result) {
      return res.json({
        errCode: 0,
        data: result
      });
    }

    return res.json({
      errCode: 1,
      msg: '支付网关错误，请重试   ---- 此提示语自动生成，请及时修改 ----'
    });

  },

  /**
   * @api {post} /api/iotpay/notify IOT支付成功回调
   * @apiGroup Pay
   * @apiVersion 1.0.0
   * 
   * @apiDescription 支付成功后，IOT系统会对notifyUrl发出通知，收到通知后，商户业务系统可以更新内部订单状态和其它业务相关的操作。
   * 自己不要调用该接口
   * 
   */
  notify: async function(req, res) {

    let params = req.allParams();
    let sign = IOTPayService.generateSign(params);

    if (sign === params.sign && parseInt(params.status) === 2) {
      let str = await sails.getDatastore().transaction(async function (db) {
        let recharge = await Pay_recharge.findOne({
          pay_order_no: params.payOrderId
        }).usingConnection(db);
        if (!recharge) { //没有该比充值，一般不会出现，有可能是伪造的访问
          return 'success';
        }
        if (recharge.status === 0) { //已经充值完成了，直接返回成功
          return 'success';
        }
        let amount = parseInt(params.amount);
        
        //更新余额
        let sql = 'update xt_member set balance=balance+$1 where id=$2';
        await sails.sendNativeQuery(sql, [amount, recharge.member]).usingConnection(db);

        //更新充值记录
        await Pay_recharge.update({id: recharge.id}, {status: 0}).usingConnection(db);

        //创建收支记录
        await Pay_inoutdetail.create({
          member: recharge.member,
          classes: 'RECHARGE',
          price: amount,
          type: 0,
          title: '充值',
          desc: `充值${amount}分,商户订单号:${params.mchOrderNo},IOT订单号:${params.payOrderId}`
        }).usingConnection(db);

        return 'success'

      });
      return res.send(str);
    } else {
      return res.send('fail');
    }
    
  },

  /**
   * @api {post} /api/iotpay/check_pay_status 查询是否充值成功
   * @apiGroup Pay
   * @apiVersion 1.0.0
   * 
   * @apiDescription 通过IOT的订单号查询是否充值成功
   * 
   * @apiParam {string} payOrderId IOT支付订单号
   * 
   * @apiSuccess {int} errCode 0：充值成功，1：还未成功或失败
   * 
   */
  check_pay_status: async function(req, res) {
    let payOrderId = req.param('payOrderId');
    let recharge = await Pay_recharge.findOne({
      pay_order_no: payOrderId
    });
    if (recharge && recharge.status === 0) {
      return res.json({
        errCode: 0
      });
    } else {
      return res.json({
        errCode: 1
      });
    }
  }

};