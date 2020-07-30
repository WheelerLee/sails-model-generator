/**
 * Created by WheelerLee.
 * api/MemberController
 * 会员操作的控制器
 * Copyright 2020 https://github.com/WheelerLee
 */
const Joi = require('@hapi/joi');
const uuid = require('uuid');

module.exports = {

  /**
   * @api {post} /api/member/signup 注册
   * @apiGroup Member
   * @apiVersion 1.0.0
   * 
   * @description 
   * 
   * Created at 2020年06月19日15:47:33 by Wheeler
   *
   * @apiParam {string} area_code 区号
   * @apiParam {string} mobile_num 手机号
   * @apiParam {string} password 密码
   * @apiParam {string} registry_way 注册方式，ios或android
   * @apiParam {string} code 短信验证码
   * @apiParam {string} invite_code 邀请码
   * 
   * @apiSuccess {int} errCode 0：成功，1：失败
   * @apiSuccess {string} msg 返回信息
   */
  signup: async function (req, res) {
    
    let area_code = req.param('area_code'); //区号
    let mobile_num = req.param('mobile_num'); //手机号
    let password = req.param('password'); //密码
    let registry_way = req.param('registry_way'); //注册方式
    let code = req.param("code"); //验证码
    let invite_code = req.param("invite_code"); //邀请码 可为空

    const schema = Joi.object({
      area_code: Joi.number().integer().required(),
      mobile_num: Joi.string().regex(/[0-9]+/).min(10).max(11).required(),
      password: Joi.string().min(6).max(28).required(),
      registry_way: Joi.string().valid('ios', 'android').required(),
      code: Joi.string().regex(/[0-9]+/).length(4).required(),
      invite_code: Joi.string().empty('').optional()
    });

    let data = schema.validate({
      area_code: area_code,
      mobile_num: mobile_num,
      password: password,
      registry_way: registry_way,
      code: code,
      invite_code: invite_code
    });
    if (data.error) { //验证不通过，直接返回错误就可以了，因为前端有验证
      return res.json({
        errCode: 1,
        data: data.error
      });
    }

    let invite_member;
    if (data.value.invite_code) { //如果有邀请码
      invite_member = await Xt_member.findOne({invite_code: data.value.invite_code});
      if (!invite_member) {
        return res.json({
          errCode: 1,
          msg: '邀请码错误   ---- 此提示语自动生成，请及时修改 ----'
        });
      }
    }

    let available = await Msg_sms_record.checkCode(data.value.area_code, data.value.mobile_num, data.value.code);
    if (!available) {
      return res.json({
        errCode: 1,
        msg: '验证码错误   ---- 此提示语自动生成，请及时修改 ----'
      });
    }

    let member = await Xt_member.findOne({mobile_num: data.value.mobile_num});
    if (member) {
      return res.json({
        errCode: 1,
        msg: '该手机号已被注册   ---- 此提示语自动生成，请及时修改 ----'
      });
    }

    member = await Xt_member.create({
      area_code: data.value.area_code, 
      mobile_num: data.value.mobile_num,
      password: PasswordService.pwd(data.value.password),
      invite_code: new Date().getTime() + '', //这里修改为合适的生成方法
      languages: 'en',
      registry_way: data.value.registry_way,
      invite_member: invite_member ? invite_member.id : null
    }).fetch();

    delete member.password; //移除密码，防止别人破解解密规则

    res.json({
      errCode: 0,
      data: member,
      msg: '注册成功   ---- 此提示语自动生成，请及时修改 ----'
    });

  },

  /**
   * @api {post} /api/member/send_verification_code 发送验证码
   * @apiGroup Member
   * @apiVersion 1.0.0
   *
   * @description 
   * 
   * Created at 2020年06月19日15:47:33 by Wheeler
   * 
   * @apiParam {string} area_code 区号
   * @apiParam {string} mobile_num 手机号
   * @apiParam {string} feature 验证码用途，signup: 注册  forget_pwd：找回密码
   *
   * @apiSuccess {int} errCode 0：成功，1：失败
   * @apiSuccess {string} msg 返回信息
   */
  send_verification_code: async function (req, res) {
    
    let area_code = req.param('area_code'); //区号
    let mobile_num = req.param('mobile_num'); //手机号
    let feature = req.param('feature'); //功能

    const schema = Joi.object({
      area_code: Joi.number().integer().required(),
      mobile_num: Joi.string().regex(/[0-9]+/).min(10).max(11).required(),
      feature: Joi.string().valid('signup', 'forget_pwd').required()
    });

    let data = schema.validate({
      area_code: area_code,
      mobile_num: mobile_num,
      feature: feature
    });
    if (data.error) { //验证不通过，直接返回错误就可以了，因为前端有验证
      return res.json({
        errCode: 1,
        data: data.error
      });
    }

    let member = await Xt_member.findOne({
      area_code: area_code,
      mobile_num: mobile_num
    });  //查找手机号是否注册

    if (feature === 'signup') {
      if (member) { //用户已经注册
        return res.json({
          errCode: 1,
          msg: '手机号已被注册   ---- 此提示语自动生成，请及时修改 ----'
        });
      }
    } else {
      if (!member) { //用户未注册
        return res.json({
          errCode: 1,
          msg: '手机号尚未注册   ---- 此提示语自动生成，请及时修改 ----'
        });
      }
    }

    let code = "";
    for (var i = 0; i < 4; i++) {
      code += Math.floor(Math.random(0, 9) * 10);
    }
    MessageService.sms(data.value.area_code + '', data.value.mobile_num, code, `您的验证码为：${code}   ---- 此提示语自动生成，请及时修改 ----`, 
      req.ip.replace(/f/g, '').replace(/:/g, ''));

    res.json({
      errCode: 0,
      msg: '发送成功   ---- 此提示语自动生成，请及时修改 ----'
    });

  },

  /**
   * @api {post} /api/member/login 登录
   * @apiGroup Member
   * @apiVersion 1.0.0
   *
   * @description 
   * 
   * Created at 2020年06月19日15:47:33 by Wheeler
   * 
   * @apiParam {string} mobile_num 手机号
   * @apiParam {string} password 密码
   * @apiParam {string} device_name 手机名称
   * @apiParam {string} device_model 手机型号
   *
   * @apiSuccess {int} errCode 0：成功，1：失败
   * @apiSuccess {string} msg 返回信息
   */
  login: async function (req, res) {
    
    let mobile_num = req.param('mobile_num'); //手机号
    let password = req.param('password'); //密码
    let device_name = req.param("device_name");
    let device_model = req.param("device_model");

    const schema = Joi.object({
      mobile_num: Joi.string().regex(/[0-9]+/).min(10).max(11).required(),
      password: Joi.string().min(6).max(28).required(),
      device_name: Joi.string().trim(),
      device_model: Joi.string().trim()
    });

    let data = schema.validate({
      mobile_num: mobile_num,
      password: password,
      device_name: device_name,
      device_model: device_model
    });
    if (data.error) {
      return res.json({
        errCode: 1,
        msg: '用户名或密码格式错误   ---- 此提示语自动生成，请及时修改 ----'
      });
    }

    password = PasswordService.pwd(password);
    let member = await Xt_member.findOne({
      mobile_num: mobile_num,
      password: password
    });
    if (member) {
      if (member.deleted !== 0) { //用户被删除了
        return res.json({
          errCode: 1,
          msg: '该账号已被冻结   ---- 此提示语自动生成，请及时修改 ----'
        });
      }
      let token = uuid.v4();
      await Tapin_member.update({id: member.id}, {apptoken: token});
      delete member.password;
      member.apptoken = token;
      return res.json({
        errCode: 0,
        data: member
      });
    } else {
      res.json({
        errCode: 1,
        msg: '用户名或密码错误   ---- 此提示语自动生成，请及时修改 ----'
      });
    }

  },

  /**
   * @api {post} /api/member/find_pwd 找回密码
   * @apiGroup Member
   * @apiVersion 1.0.0
   * 
   * @description 
   * 
   * Created at 2020年06月19日15:47:33 by Wheeler
   *
   * @apiParam {string} area_code 区号
   * @apiParam {string} mobile_num 手机号
   * @apiParam {string} password 密码
   * @apiParam {string} code 短信验证码
   * 
   * @apiSuccess {int} errCode 0：成功，1：失败
   * @apiSuccess {string} msg 返回信息
   */
  find_pwd: async function (req, res) {
    let area_code = req.param('area_code'); //区号
    let mobile_num = req.param('mobile_num'); //手机号
    let password = req.param('password'); //密码
    let code = req.param('code'); //短信验证码
    const schema = Joi.object({
      area_code: Joi.number().integer().required(),
      mobile_num: Joi.string().regex(/[0-9]+/).min(10).max(11).required(),
      password: Joi.string().min(6).max(28).required(),
      code: Joi.string().regex(/[0-9]+/).length(4).required()
    });

    let data = schema.validate({
      area_code: area_code,
      mobile_num: mobile_num,
      password: password,
      code: code
    });
    if (data.error) { //验证不通过，直接返回错误就可以了，因为前端有验证
      return res.json({
        errCode: 1,
        data: data.error
      });
    }

    let member = await Xt_member.findOne({area_code: data.value.area_code, mobile_num: data.value.mobile_num});
    if (!member) {
      return res.json({
        errCode: 1,
        msg: '该手机号尚未注册   ---- 此提示语自动生成，请及时修改 ----'
      });
    }

    let available = await Msg_sms_record.checkCode(data.value.area_code, data.value.mobile_num, data.value.code);
    if (!available) {
      return res.json({
        errCode: 1,
        msg: '验证码错误   ---- 此提示语自动生成，请及时修改 ----'
      });
    }

    await Xt_member.update({
      id: member.id
    }, {
      password: PasswordService.pwd(data.value.password),
      apptoken: null
    });

    res.json({
      errCode: 0,
      msg: '修改成功   ---- 此提示语自动生成，请及时修改 ----'
    });

  }

};
