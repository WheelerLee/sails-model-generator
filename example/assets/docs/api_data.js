define({ "api": [
  {
    "type": "post",
    "url": "/api/member/find_pwd",
    "title": "找回密码",
    "group": "Member",
    "version": "1.0.0",
    "description": "<p>Created at 2020年06月19日15:47:33 by Wheeler</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "area_code",
            "description": "<p>区号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobile_num",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>短信验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "errCode",
            "description": "<p>0：成功，1：失败</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回信息</p>"
          }
        ]
      }
    },
    "filename": "api/controllers/API/MemberController.js",
    "groupTitle": "Member",
    "name": "PostApiMemberFind_pwd",
    "sampleRequest": [
      {
        "url": "http://192.168.8.254:1337/api/member/find_pwd"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/member/login",
    "title": "登录",
    "group": "Member",
    "version": "1.0.0",
    "description": "<p>Created at 2020年06月19日15:47:33 by Wheeler</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobile_num",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "device_name",
            "description": "<p>手机名称</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "device_model",
            "description": "<p>手机型号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "errCode",
            "description": "<p>0：成功，1：失败</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回信息</p>"
          }
        ]
      }
    },
    "filename": "api/controllers/API/MemberController.js",
    "groupTitle": "Member",
    "name": "PostApiMemberLogin",
    "sampleRequest": [
      {
        "url": "http://192.168.8.254:1337/api/member/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/member/send_verification_code",
    "title": "发送验证码",
    "group": "Member",
    "version": "1.0.0",
    "description": "<p>Created at 2020年06月19日15:47:33 by Wheeler</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "area_code",
            "description": "<p>区号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobile_num",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "feature",
            "description": "<p>验证码用途，signup: 注册  forget_pwd：找回密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "errCode",
            "description": "<p>0：成功，1：失败</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回信息</p>"
          }
        ]
      }
    },
    "filename": "api/controllers/API/MemberController.js",
    "groupTitle": "Member",
    "name": "PostApiMemberSend_verification_code",
    "sampleRequest": [
      {
        "url": "http://192.168.8.254:1337/api/member/send_verification_code"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/member/signup",
    "title": "注册",
    "group": "Member",
    "version": "1.0.0",
    "description": "<p>Created at 2020年06月19日15:47:33 by Wheeler</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "area_code",
            "description": "<p>区号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobile_num",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "registry_way",
            "description": "<p>注册方式，ios或android</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>短信验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "invite_code",
            "description": "<p>邀请码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "errCode",
            "description": "<p>0：成功，1：失败</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回信息</p>"
          }
        ]
      }
    },
    "filename": "api/controllers/API/MemberController.js",
    "groupTitle": "Member",
    "name": "PostApiMemberSignup",
    "sampleRequest": [
      {
        "url": "http://192.168.8.254:1337/api/member/signup"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/iotpay/create_order",
    "title": "统一下单",
    "group": "Pay",
    "version": "1.0.0",
    "description": "<p>业务通过统一下单接口可以发起任意三方支付(微信支付宝支付系统)渠道的支付订单。 业务系统不必关心该如何调用三方支付，统一下单接口会根据业务系统选择的支付渠道ID，选择对应支付渠道的支付产品， 发起下单请求，然后响应给业务系统支付请求所需参数。</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "amount",
            "description": "<p>充值的金额，单位是加拿大分</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "member_id",
            "description": "<p>需要充值的会员ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"WX_APP\"",
              "\"ALIPAY_MOBILE\""
            ],
            "optional": false,
            "field": "channel",
            "description": "<p>支付渠道ID。WX_APP：微信APP支付，ALIPAY_MOBILE：支付宝APP支付</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "errCode",
            "description": "<p>0：成功，1：失败</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>返回信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>统一下单返回的所有数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Object|String",
            "optional": false,
            "field": "data.payParams",
            "description": "<p>调起微信或者支付宝支付需要的参数，支付宝是String，微信是包含所有数据的Object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.mchOrderNo",
            "description": "<p>平台订单号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.payOrderId",
            "description": "<p>第三方支付订单号</p>"
          }
        ]
      }
    },
    "filename": "api/controllers/API/IOTPayController.js",
    "groupTitle": "Pay",
    "name": "PostApiIotpayCreate_order",
    "sampleRequest": [
      {
        "url": "http://192.168.8.254:1337/api/iotpay/create_order"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/iotpay/notify",
    "title": "IOT支付成功回调",
    "group": "Pay",
    "version": "1.0.0",
    "description": "<p>支付成功后，IOT系统会对notifyUrl发出通知，收到通知后，商户业务系统可以更新内部订单状态和其它业务相关的操作。 自己不要调用该接口</p>",
    "filename": "api/controllers/API/IOTPayController.js",
    "groupTitle": "Pay",
    "name": "PostApiIotpayNotify",
    "sampleRequest": [
      {
        "url": "http://192.168.8.254:1337/api/iotpay/notify"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/api/version/check_update",
    "title": "检查APP是否有更新",
    "group": "version",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "version_code",
            "description": "<p>app当前的版本号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "platform",
            "description": "<p>APP运行的系统，android或者ios</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "errCode",
            "description": "<p>0: 有新版本，1: 没有新版本</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回消息</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>返回数据</p>"
          }
        ]
      }
    },
    "filename": "api/controllers/API/VersionController.js",
    "groupTitle": "version",
    "name": "PostApiVersionCheck_update",
    "sampleRequest": [
      {
        "url": "http://192.168.8.254:1337/api/version/check_update"
      }
    ]
  }
] });
