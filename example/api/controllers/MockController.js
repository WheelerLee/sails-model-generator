/**
 * MockController
 * 生成默认数据的控制器，不要重复运行,正式环境请删除该文件
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  add: async function (req, res) {

    let a = await sails.getDatastore().transaction(async function (db, proceed) {
      try {

        await Xt_setting.destroy({});
        await Xt_dict.destroy({});
        await Xt_resource.destroy({});
        await Xt_role_resource.destroy({});
        await Xt_role.destroy({});
        await Xt_user.destroy({});

        //创建基本的字典
        await Xt_dict.create({id: 'user', code: 'user', name: '用户', name_en: 'User'}).usingConnection(db);
        await Xt_dict.create({
          id: 'authority_management',
          code: 'authority_management',
          name: '权限管理',
          name_en: 'Authority management'
        }).usingConnection(db);
        await Xt_dict.create({
          id: 'user_sex',
          code: 'user_sex',
          name: '性别',
          name_en: 'Sex',
          parent_id: 'user'
        }).usingConnection(db);
        await Xt_dict.create({
          id: 'resource_type',
          code: 'resource_type',
          name: '资源类型',
          name_en: 'Resource Type',
          parent_id: 'authority_management'
        }).usingConnection(db);
        await Xt_dict.create({
          id: 'resource_btn',
          code: 'resource_btn',
          name: '按钮',
          name_en: 'Button',
          sorted_num: 2,
          parent_id: 'resource_type'
        }).usingConnection(db);
        await Xt_dict.create({
          id: 'resource_page',
          code: 'resource_page',
          name: '页面',
          name_en: 'Page',
          parent_id: 'resource_type'
        }).usingConnection(db);
        await Xt_dict.create({
          id: 'sex_female',
          code: 'sex_female',
          name: '女',
          name_en: 'Female',
          parent_id: 'user_sex'
        }).usingConnection(db);
        await Xt_dict.create({
          id: 'sex_male',
          code: 'sex_male',
          name: '男',
          name_en: 'Male',
          sorted_num: 2,
          parent_id: 'user_sex'
        }).usingConnection(db);

        let admin = await Xt_user.create({
          nick_name: 'Super admin',
          login_name: 'admin',
          password: PasswordService.pwd("123456")
        }).fetch().usingConnection(db);  //创建管理员账号

        let role = await Xt_role.create({
          name: '超级管理员'
        }).fetch().usingConnection(db);  //创建超级管理员角色

        await Xt_user_role.create({
          role_id: role.id,
          user_id: admin.id
        }).usingConnection(db);   //将管理员账号设置为超级管理员角色

        //创建权限管理资源
        let resource_auth = await Xt_resource.create({
          name: '权限管理',
          res_type_code: 'resource_page',
          icon_path: '&#xe672;',
          sorted_num: 2
        }).fetch().usingConnection(db);
        await Xt_role_resource.create({
          role_id: role.id,
          resource_id: resource_auth.id
        });

        //创建系统管理资源
        let resource_system = await Xt_resource.create({
          name: '系统管理',
          res_type_code: 'resource_page',
          icon_path: '&#xe716;',
          sorted_num: 1
        }).fetch().usingConnection(db);
        //创建权限管理子资源
        let auth_sub_resources = [
          {
            name: '资源管理',
            res_type_code: 'resource_page',
            sorted_num: 2,
            path: '/admin/xt_resource/index',
            parent_id: resource_auth.id
          },
          {
            name: '资源添加编辑',
            res_type_code: 'resource_btn',
            sorted_num: 2,
            path: '/admin/xt_resource/modify',
            parent_id: resource_auth.id
          },
          {
            name: '资源删除',
            res_type_code: 'resource_btn',
            sorted_num: 2,
            path: '/admin/xt_resource/delete',
            parent_id: resource_auth.id
          },
          {
            name: '角色添加编辑',
            res_type_code: 'resource_btn',
            sorted_num: 2,
            path: '/admin/xt_role/modify',
            parent_id: resource_auth.id
          },
          {
            name: '角色删除',
            res_type_code: 'resource_btn',
            sorted_num: 2,
            path: '/admin/xt_role/delete',
            parent_id: resource_auth.id
          },
          {
            name: '管理员列表',
            res_type_code: 'resource_page',
            sorted_num: 3,
            path: '/admin/xt_user/index',
            parent_id: resource_auth.id
          },
          {
            name: '管理员添加编辑',
            res_type_code: 'resource_btn',
            sorted_num: 2,
            path: '/admin/xt_user/modify',
            parent_id: resource_auth.id
          },
          {
            name: '管理员删除',
            res_type_code: 'resource_btn',
            sorted_num: 2,
            path: '/admin/xt_user/delete',
            parent_id: resource_auth.id
          }
        ];
        for (let auth_sub_resource of auth_sub_resources) {
          await Xt_resource.create(auth_sub_resource).usingConnection(db);
        }

        let xt_role_index = await Xt_resource.create({
          name: '角色管理',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/xt_role/index',
          parent_id: resource_auth.id
        }).fetch().usingConnection(db);
        await Xt_role_resource.create({
          role_id: role.id,
          resource_id: xt_role_index.id
        });

        let distribution_resource = await Xt_resource.create({
          name: '分配资源',
          res_type_code: 'resource_btn',
          sorted_num: 2,
          path: '/admin/xt_role/distribution_resource',
          parent_id: resource_auth.id
        },).fetch().usingConnection(db);
        await Xt_role_resource.create({
          role_id: role.id,
          resource_id: distribution_resource.id
        });

        await Xt_resource.create({
          name: '字典管理',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/xt_dict/index',
          parent_id: resource_system.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: '字典添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/xt_dict/modify',
          parent_id: resource_system.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: '字典删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/xt_dict/delete',
          parent_id: resource_system.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: '站点管理',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/system/site',
          parent_id: resource_system.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: '邮件服务器',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/system/email',
          parent_id: resource_system.id
        }).usingConnection(db);

        let settings = [
          {
            id: 'system_settings',
            value: [
              {id: 'site_name',value: '后台管理系统'},
              {id: 'maximum_upload_size', value: '10240'}
            ]
          },
          {
            id: 'email_settings',
            value: [
              {id: 'email_host', value: ''},
              {id: 'email_port', value: ''},
              {id: 'email_user', value: ''},
              {id: 'email_password', value: ''},
              {id: 'email_secure', value: '0'},
              {id: 'email_sender', value: ''}
            ]
          }
        ];
        for (let setting of settings) {
          let big = await Xt_setting.create({
            id: setting.id,
            value: 'object'
          }).fetch().usingConnection(db);
          for (let s of setting.value) {
            await Xt_setting.create({
              id: s.id,
              value: s.value,
              parent: big.id
            }).usingConnection(db);
          }
        }

        let banner = await Xt_resource.create({
          name: 'Banner管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Banner列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/banner/index',
          parent_id: banner.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Banner添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/banner/modify',
          parent_id: banner.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Banner删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/banner/delete',
          parent_id: banner.id
        }).usingConnection(db);


        let city = await Xt_resource.create({
          name: 'City管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'City列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/city/index',
          parent_id: city.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'City添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/city/modify',
          parent_id: city.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'City删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/city/delete',
          parent_id: city.id
        }).usingConnection(db);


        let country = await Xt_resource.create({
          name: 'Country管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Country列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/country/index',
          parent_id: country.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Country添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/country/modify',
          parent_id: country.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Country删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/country/delete',
          parent_id: country.id
        }).usingConnection(db);


        let course_collection = await Xt_resource.create({
          name: 'Course_collection管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Course_collection列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/course_collection/index',
          parent_id: course_collection.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Course_collection添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/course_collection/modify',
          parent_id: course_collection.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Course_collection删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/course_collection/delete',
          parent_id: course_collection.id
        }).usingConnection(db);


        let invite_registe = await Xt_resource.create({
          name: 'Invite_registe管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Invite_registe列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/invite_registe/index',
          parent_id: invite_registe.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Invite_registe添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/invite_registe/modify',
          parent_id: invite_registe.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Invite_registe删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/invite_registe/delete',
          parent_id: invite_registe.id
        }).usingConnection(db);


        let jz_activity = await Xt_resource.create({
          name: 'Jz_activity管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Jz_activity列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/jz_activity/index',
          parent_id: jz_activity.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Jz_activity添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/jz_activity/modify',
          parent_id: jz_activity.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Jz_activity删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/jz_activity/delete',
          parent_id: jz_activity.id
        }).usingConnection(db);


        let jz_record = await Xt_resource.create({
          name: 'Jz_record管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Jz_record列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/jz_record/index',
          parent_id: jz_record.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Jz_record添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/jz_record/modify',
          parent_id: jz_record.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Jz_record删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/jz_record/delete',
          parent_id: jz_record.id
        }).usingConnection(db);


        let msg_message = await Xt_resource.create({
          name: 'Msg_message管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Msg_message列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/msg_message/index',
          parent_id: msg_message.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Msg_message添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/msg_message/modify',
          parent_id: msg_message.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Msg_message删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/msg_message/delete',
          parent_id: msg_message.id
        }).usingConnection(db);


        let msg_send_record = await Xt_resource.create({
          name: 'Msg_send_record管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Msg_send_record列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/msg_send_record/index',
          parent_id: msg_send_record.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Msg_send_record添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/msg_send_record/modify',
          parent_id: msg_send_record.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Msg_send_record删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/msg_send_record/delete',
          parent_id: msg_send_record.id
        }).usingConnection(db);


        let msg_type = await Xt_resource.create({
          name: 'Msg_type管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Msg_type列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/msg_type/index',
          parent_id: msg_type.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Msg_type添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/msg_type/modify',
          parent_id: msg_type.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Msg_type删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/msg_type/delete',
          parent_id: msg_type.id
        }).usingConnection(db);


        let news = await Xt_resource.create({
          name: 'News管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'News列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/news/index',
          parent_id: news.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'News添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/news/modify',
          parent_id: news.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'News删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/news/delete',
          parent_id: news.id
        }).usingConnection(db);


        let province = await Xt_resource.create({
          name: 'Province管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Province列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/province/index',
          parent_id: province.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Province添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/province/modify',
          parent_id: province.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Province删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/province/delete',
          parent_id: province.id
        }).usingConnection(db);


        let system_log = await Xt_resource.create({
          name: 'System_log管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'System_log列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/system_log/index',
          parent_id: system_log.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'System_log添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/system_log/modify',
          parent_id: system_log.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'System_log删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/system_log/delete',
          parent_id: system_log.id
        }).usingConnection(db);


        let teacher_collection = await Xt_resource.create({
          name: 'Teacher_collection管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Teacher_collection列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/teacher_collection/index',
          parent_id: teacher_collection.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Teacher_collection添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/teacher_collection/modify',
          parent_id: teacher_collection.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Teacher_collection删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/teacher_collection/delete',
          parent_id: teacher_collection.id
        }).usingConnection(db);


        let tuex_address = await Xt_resource.create({
          name: 'Tuex_address管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_address列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_address/index',
          parent_id: tuex_address.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_address添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_address/modify',
          parent_id: tuex_address.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_address删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_address/delete',
          parent_id: tuex_address.id
        }).usingConnection(db);


        let tuex_answer = await Xt_resource.create({
          name: 'Tuex_answer管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_answer列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_answer/index',
          parent_id: tuex_answer.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_answer添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_answer/modify',
          parent_id: tuex_answer.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_answer删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_answer/delete',
          parent_id: tuex_answer.id
        }).usingConnection(db);


        let tuex_answer_reply = await Xt_resource.create({
          name: 'Tuex_answer_reply管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_answer_reply列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_answer_reply/index',
          parent_id: tuex_answer_reply.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_answer_reply添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_answer_reply/modify',
          parent_id: tuex_answer_reply.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_answer_reply删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_answer_reply/delete',
          parent_id: tuex_answer_reply.id
        }).usingConnection(db);


        let tuex_answer_view = await Xt_resource.create({
          name: 'Tuex_answer_view管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_answer_view列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_answer_view/index',
          parent_id: tuex_answer_view.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_answer_view添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_answer_view/modify',
          parent_id: tuex_answer_view.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_answer_view删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_answer_view/delete',
          parent_id: tuex_answer_view.id
        }).usingConnection(db);


        let tuex_commentreply = await Xt_resource.create({
          name: 'Tuex_commentreply管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_commentreply列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_commentreply/index',
          parent_id: tuex_commentreply.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_commentreply添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_commentreply/modify',
          parent_id: tuex_commentreply.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_commentreply删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_commentreply/delete',
          parent_id: tuex_commentreply.id
        }).usingConnection(db);


        let tuex_comments = await Xt_resource.create({
          name: 'Tuex_comments管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_comments列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_comments/index',
          parent_id: tuex_comments.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_comments添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_comments/modify',
          parent_id: tuex_comments.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_comments删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_comments/delete',
          parent_id: tuex_comments.id
        }).usingConnection(db);


        let tuex_coupon = await Xt_resource.create({
          name: 'Tuex_coupon管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_coupon列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_coupon/index',
          parent_id: tuex_coupon.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_coupon添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_coupon/modify',
          parent_id: tuex_coupon.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_coupon删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_coupon/delete',
          parent_id: tuex_coupon.id
        }).usingConnection(db);


        let tuex_coupon_record = await Xt_resource.create({
          name: 'Tuex_coupon_record管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_coupon_record列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_coupon_record/index',
          parent_id: tuex_coupon_record.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_coupon_record添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_coupon_record/modify',
          parent_id: tuex_coupon_record.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_coupon_record删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_coupon_record/delete',
          parent_id: tuex_coupon_record.id
        }).usingConnection(db);


        let tuex_course = await Xt_resource.create({
          name: 'Tuex_course管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_course列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_course/index',
          parent_id: tuex_course.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_course添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_course/modify',
          parent_id: tuex_course.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_course删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_course/delete',
          parent_id: tuex_course.id
        }).usingConnection(db);


        let tuex_course_signin = await Xt_resource.create({
          name: 'Tuex_course_signin管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_course_signin列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_course_signin/index',
          parent_id: tuex_course_signin.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_course_signin添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_course_signin/modify',
          parent_id: tuex_course_signin.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_course_signin删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_course_signin/delete',
          parent_id: tuex_course_signin.id
        }).usingConnection(db);


        let tuex_courseorder = await Xt_resource.create({
          name: 'Tuex_courseorder管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_courseorder列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_courseorder/index',
          parent_id: tuex_courseorder.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_courseorder添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_courseorder/modify',
          parent_id: tuex_courseorder.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_courseorder删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_courseorder/delete',
          parent_id: tuex_courseorder.id
        }).usingConnection(db);


        let tuex_courseorderitem = await Xt_resource.create({
          name: 'Tuex_courseorderitem管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_courseorderitem列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_courseorderitem/index',
          parent_id: tuex_courseorderitem.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_courseorderitem添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_courseorderitem/modify',
          parent_id: tuex_courseorderitem.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_courseorderitem删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_courseorderitem/delete',
          parent_id: tuex_courseorderitem.id
        }).usingConnection(db);


        let tuex_email = await Xt_resource.create({
          name: 'Tuex_email管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_email列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_email/index',
          parent_id: tuex_email.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_email添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_email/modify',
          parent_id: tuex_email.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_email删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_email/delete',
          parent_id: tuex_email.id
        }).usingConnection(db);


        let tuex_feedback = await Xt_resource.create({
          name: 'Tuex_feedback管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_feedback列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_feedback/index',
          parent_id: tuex_feedback.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_feedback添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_feedback/modify',
          parent_id: tuex_feedback.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_feedback删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_feedback/delete',
          parent_id: tuex_feedback.id
        }).usingConnection(db);


        let tuex_guardian = await Xt_resource.create({
          name: 'Tuex_guardian管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_guardian列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_guardian/index',
          parent_id: tuex_guardian.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_guardian添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_guardian/modify',
          parent_id: tuex_guardian.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_guardian删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_guardian/delete',
          parent_id: tuex_guardian.id
        }).usingConnection(db);


        let tuex_guardian_payment = await Xt_resource.create({
          name: 'Tuex_guardian_payment管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_guardian_payment列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_guardian_payment/index',
          parent_id: tuex_guardian_payment.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_guardian_payment添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_guardian_payment/modify',
          parent_id: tuex_guardian_payment.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_guardian_payment删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_guardian_payment/delete',
          parent_id: tuex_guardian_payment.id
        }).usingConnection(db);


        let tuex_guardian_student = await Xt_resource.create({
          name: 'Tuex_guardian_student管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_guardian_student列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_guardian_student/index',
          parent_id: tuex_guardian_student.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_guardian_student添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_guardian_student/modify',
          parent_id: tuex_guardian_student.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_guardian_student删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_guardian_student/delete',
          parent_id: tuex_guardian_student.id
        }).usingConnection(db);


        let tuex_inoutdetail = await Xt_resource.create({
          name: 'Tuex_inoutdetail管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_inoutdetail列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_inoutdetail/index',
          parent_id: tuex_inoutdetail.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_inoutdetail添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_inoutdetail/modify',
          parent_id: tuex_inoutdetail.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_inoutdetail删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_inoutdetail/delete',
          parent_id: tuex_inoutdetail.id
        }).usingConnection(db);


        let tuex_logindevice = await Xt_resource.create({
          name: 'Tuex_logindevice管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_logindevice列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_logindevice/index',
          parent_id: tuex_logindevice.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_logindevice添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_logindevice/modify',
          parent_id: tuex_logindevice.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_logindevice删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_logindevice/delete',
          parent_id: tuex_logindevice.id
        }).usingConnection(db);


        let tuex_loginrecord = await Xt_resource.create({
          name: 'Tuex_loginrecord管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_loginrecord列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_loginrecord/index',
          parent_id: tuex_loginrecord.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_loginrecord添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_loginrecord/modify',
          parent_id: tuex_loginrecord.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_loginrecord删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_loginrecord/delete',
          parent_id: tuex_loginrecord.id
        }).usingConnection(db);


        let tuex_member = await Xt_resource.create({
          name: 'Tuex_member管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_member列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_member/index',
          parent_id: tuex_member.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_member添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_member/modify',
          parent_id: tuex_member.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_member删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_member/delete',
          parent_id: tuex_member.id
        }).usingConnection(db);


        let tuex_question = await Xt_resource.create({
          name: 'Tuex_question管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_question列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_question/index',
          parent_id: tuex_question.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_question添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_question/modify',
          parent_id: tuex_question.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_question删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_question/delete',
          parent_id: tuex_question.id
        }).usingConnection(db);


        let tuex_recharge = await Xt_resource.create({
          name: 'Tuex_recharge管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_recharge列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_recharge/index',
          parent_id: tuex_recharge.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_recharge添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_recharge/modify',
          parent_id: tuex_recharge.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_recharge删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_recharge/delete',
          parent_id: tuex_recharge.id
        }).usingConnection(db);


        let tuex_refund = await Xt_resource.create({
          name: 'Tuex_refund管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_refund列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_refund/index',
          parent_id: tuex_refund.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_refund添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_refund/modify',
          parent_id: tuex_refund.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_refund删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_refund/delete',
          parent_id: tuex_refund.id
        }).usingConnection(db);


        let tuex_report = await Xt_resource.create({
          name: 'Tuex_report管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_report列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_report/index',
          parent_id: tuex_report.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_report添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_report/modify',
          parent_id: tuex_report.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_report删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_report/delete',
          parent_id: tuex_report.id
        }).usingConnection(db);


        let tuex_teacher = await Xt_resource.create({
          name: 'Tuex_teacher管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_teacher/index',
          parent_id: tuex_teacher.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teacher/modify',
          parent_id: tuex_teacher.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teacher/delete',
          parent_id: tuex_teacher.id
        }).usingConnection(db);


        let tuex_teacher_city = await Xt_resource.create({
          name: 'Tuex_teacher_city管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_city列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_teacher_city/index',
          parent_id: tuex_teacher_city.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_city添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teacher_city/modify',
          parent_id: tuex_teacher_city.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_city删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teacher_city/delete',
          parent_id: tuex_teacher_city.id
        }).usingConnection(db);


        let tuex_teacher_school = await Xt_resource.create({
          name: 'Tuex_teacher_school管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_school列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_teacher_school/index',
          parent_id: tuex_teacher_school.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_school添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teacher_school/modify',
          parent_id: tuex_teacher_school.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_school删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teacher_school/delete',
          parent_id: tuex_teacher_school.id
        }).usingConnection(db);


        let tuex_teacher_student = await Xt_resource.create({
          name: 'Tuex_teacher_student管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_student列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_teacher_student/index',
          parent_id: tuex_teacher_student.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_student添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teacher_student/modify',
          parent_id: tuex_teacher_student.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_student删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teacher_student/delete',
          parent_id: tuex_teacher_student.id
        }).usingConnection(db);


        let tuex_teacher_work = await Xt_resource.create({
          name: 'Tuex_teacher_work管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_work列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_teacher_work/index',
          parent_id: tuex_teacher_work.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_work添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teacher_work/modify',
          parent_id: tuex_teacher_work.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teacher_work删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teacher_work/delete',
          parent_id: tuex_teacher_work.id
        }).usingConnection(db);


        let tuex_teachplace = await Xt_resource.create({
          name: 'Tuex_teachplace管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teachplace列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_teachplace/index',
          parent_id: tuex_teachplace.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teachplace添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teachplace/modify',
          parent_id: tuex_teachplace.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teachplace删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teachplace/delete',
          parent_id: tuex_teachplace.id
        }).usingConnection(db);


        let tuex_teachtime = await Xt_resource.create({
          name: 'Tuex_teachtime管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teachtime列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_teachtime/index',
          parent_id: tuex_teachtime.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teachtime添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teachtime/modify',
          parent_id: tuex_teachtime.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_teachtime删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_teachtime/delete',
          parent_id: tuex_teachtime.id
        }).usingConnection(db);


        let tuex_withdraw = await Xt_resource.create({
          name: 'Tuex_withdraw管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_withdraw列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_withdraw/index',
          parent_id: tuex_withdraw.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_withdraw添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_withdraw/modify',
          parent_id: tuex_withdraw.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_withdraw删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_withdraw/delete',
          parent_id: tuex_withdraw.id
        }).usingConnection(db);


        let tuex_withdrawcard = await Xt_resource.create({
          name: 'Tuex_withdrawcard管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_withdrawcard列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/tuex_withdrawcard/index',
          parent_id: tuex_withdrawcard.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_withdrawcard添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_withdrawcard/modify',
          parent_id: tuex_withdrawcard.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Tuex_withdrawcard删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/tuex_withdrawcard/delete',
          parent_id: tuex_withdrawcard.id
        }).usingConnection(db);


        let user_device = await Xt_resource.create({
          name: 'User_device管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'User_device列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/user_device/index',
          parent_id: user_device.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'User_device添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/user_device/modify',
          parent_id: user_device.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'User_device删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/user_device/delete',
          parent_id: user_device.id
        }).usingConnection(db);


        let web_abstruct_object = await Xt_resource.create({
          name: 'Web_abstruct_object管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Web_abstruct_object列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/web_abstruct_object/index',
          parent_id: web_abstruct_object.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Web_abstruct_object添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/web_abstruct_object/modify',
          parent_id: web_abstruct_object.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Web_abstruct_object删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/web_abstruct_object/delete',
          parent_id: web_abstruct_object.id
        }).usingConnection(db);


        let web_propertys = await Xt_resource.create({
          name: 'Web_propertys管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Web_propertys列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/web_propertys/index',
          parent_id: web_propertys.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Web_propertys添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/web_propertys/modify',
          parent_id: web_propertys.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Web_propertys删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/web_propertys/delete',
          parent_id: web_propertys.id
        }).usingConnection(db);


        let web_values = await Xt_resource.create({
          name: 'Web_values管理',
          res_type_code: 'resource_page',
          sorted_num: 1
        }).fetch().usingConnection(db);
        await Xt_resource.create({
          name: 'Web_values列表',
          res_type_code: 'resource_page',
          sorted_num: 1,
          path: '/admin/web_values/index',
          parent_id: web_values.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Web_values添加编辑',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/web_values/modify',
          parent_id: web_values.id
        }).usingConnection(db);
        await Xt_resource.create({
          name: 'Web_values删除',
          res_type_code: 'resource_btn',
          sorted_num: 1,
          path: '/admin/web_values/delete',
          parent_id: web_values.id
        }).usingConnection(db);



        //FIXME: 添加默认的setting配置
        proceed(null, {msg: '创建成功'});

      } catch (e) {
        proceed(e);
      }

    });

    return res.json(a);

  }

};

