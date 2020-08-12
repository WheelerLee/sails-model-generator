/**
 * Stripe支付的控制器
 * 此代码由生成器生成，如有问题，请联系作者 https://github.com/wheelerlee
 */
const Stripe = require("stripe");
const uuid = require('uuid');

module.exports = {

  /**
   * @api {post} /api/stripe/token 获取Stripe支付临时密钥
   * @apiDescription 为了使我们的预构建UI元素能够运行，您需要为它们提供一个临时密钥，
   * 一个具有受限API访问权限的短期API密钥。您可以将临时密钥视为会话，授权SDK在会话期间检索和更新特定的Customer对象。
   * 要为SDK提供临时密钥，您需要在后端公开新的API端点。此端点应为当前Stripe客户创建一个临时密钥，并将密钥的未修改响应作为JSON返回。
   * 如果需要测试卡号，可以前往https://stripe.com/docs/testing获取
   *
   * @apiGroup Pay
   * @apiVersion 1.0.0
   *
   * @apiParam {String} api_version stripe sdk版本号
   * @apiParam {String} member_id 用户id
   *
   * @apiSuccess {Object} object 带有临时密钥的对象
   *
   */
  token: async function(req, res) {

    if (!sails.settings.stripe_settings) {
      sails.log.error('请先设置Stripe的相关参数，才能正常使用Stripe的服务。添加stripe_settings，包含stripe_key,endpointSecret两个字段');
      return res.notFound();
    }
    const stripe_version = req.param('api_version');
    const member_id = req.param('member_id');
    const stripe = Stripe(sails.settings.stripe_settings.stripe_key);

    if (!stripe_version || !member_id) {
      return res.notFound();
    }

    let member = await Xt_member.findOne({id: member_id});
    if (!member) return res.notFound();

    let customer;
    if (!member.stripe_customer) { //如果用户没有stripe的客户id，则创建一个
      customer = await stripe.customers.create({});
      customer = customer.id;
      await Tapin_member.update({id: member_id}, {stripe_customer: customer});
    } else {
      customer = member.stripe_customer;
    }

    let key = await stripe.ephemeralKeys.create(
      {customer: customer},
      {apiVersion: stripe_version}
    );
    res.json(key);

  },

  /**
   * @api {post} /api/stripe/pay stripe支付
   * @apiDescription 支付的币种为cad
   * 此处为发起支付，具体成功与否通过回调来实现
   * 需要在Stripe的后台设置webhook
   *
   * @apiGroup Pay
   * @apiVersion 1.0.0
   *
   * @apiParam {int} amount 支付的金额，单位为分
   * @apiParam {String} member_id 用户id
   *
   * @apiSuccess {string} clientSecret 客户端调起支付使用的密钥
   *
   */
  pay: async function(req, res) {

    const stripe = Stripe(sails.settings.stripe_settings.stripe_key);
    const amount = parseInt(req.param('amount'));
    const member_id = req.param('member_id');

    if (!member_id) {
      return res.notFound();
    }
    let member = await Xt_member.findOne({id: member_id});
    if (!member) return res.notFound();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'cad',
      customer: member.stripe_customer,
      metadata: {
        member_id: member_id
      }
    });
    const clientSecret = paymentIntent.client_secret;
    return res.send(clientSecret);

  },

  webhook: async function(req, res) {

    const stripe = Stripe(sails.settings.stripe_settings.stripe_key);
    const endpointSecret = sails.settings.stripe_settings.endpointSecret;
  
    const params = req.body;
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(params, sig, endpointSecret);

    if (event.type === 'payment_intent.succeeded') {
      console.log(event);
      const paymentIntent = event.data.object;
      let rechagre = await Pay_recharge.count({
        order_no: paymentIntent.id
      });
      if (rechagre > 0) { //已经充值完成了，直接返回成功
        return res.json({
          received: true
        });
      }
      await sails.getDatastore().transaction(async function (db) {
        
        let metadata = paymentIntent.metadata;
        let member_id = metadata.member_id;
        let amount = paymentIntent.amount_received;

        let sql = 'update xt_member set balance=balance+$1 where id=$2';
        await sails.sendNativeQuery(sql, [amount, member_id]).usingConnection(db); //更新余额

        let mch_order_no = uuid.v4();
        await Pay_recharge.create({
          member: member_id,
          type: 0,
          amount: amount,
          status: 0,
          mch_order_no: mch_order_no,
          pay_order_no: paymentIntent.id
        }).usingConnection(db);
        //创建账单
        await Pay_inoutdetail.create({
          member: member_id,
          price: amount,
          type: 0,
          classes: 'RECHARGE',
          title: '充值',
          desc: `充值${amount}分,商户订单号:${mch_order_no},Stripe订单号:${paymentIntent.id}`
        }).usingConnection(db);

        return 'success';

      });
    }

    return res.json({
      received: true
    });

  }

};
