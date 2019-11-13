/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  'admin/UserController': {
    '*': ['adminSessionAuth'],
    'login': true
  },
  'admin/HomeController': {
    '*': ['adminSessionAuth']
  },
  'admin/SystemController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Xt_userController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Xt_dictController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Xt_resourceController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Xt_roleController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/MessageController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/BannerController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/CityController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/CountryController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Course_collectionController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Invite_registeController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Jz_activityController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Jz_recordController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Msg_sms_recordController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Msg_typeController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/NewsController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/ProvinceController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/System_logController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Teacher_collectionController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_addressController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_answerController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_answer_replyController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_answer_viewController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_commentreplyController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_commentsController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_couponController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_coupon_recordController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_courseController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_course_signinController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_courseorderController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_courseorderitemController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_emailController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_feedbackController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_guardianController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_guardian_paymentController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_guardian_studentController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_inoutdetailController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_logindeviceController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_loginrecordController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_memberController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_questionController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_rechargeController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_refundController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_reportController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_teacherController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_teacher_cityController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_teacher_schoolController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_teacher_studentController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_teacher_workController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_teachplaceController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_teachtimeController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_withdrawController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Tuex_withdrawcardController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/User_deviceController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Web_abstruct_objectController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Web_propertysController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Web_valuesController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Xt_memberController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Xt_translationController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },

};