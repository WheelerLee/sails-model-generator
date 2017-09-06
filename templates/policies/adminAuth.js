/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: 后台登录验证
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  if (req.session.admin) {

    return next();

  } else {

    if (req.method.toLowerCase() === 'get')
      return res.redirect('/admin/user/login');
    else
      return res.json({errCode: 4, msg: '请先登录!'});

  }

};
