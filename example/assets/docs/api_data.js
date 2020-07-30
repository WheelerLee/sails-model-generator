define({ "api": [
  {
    "type": "post",
    "url": "/api/member/find_pwd",
    "title": "找回密码",
    "group": "Member",
    "version": "1.0.0",
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
  }
] });
