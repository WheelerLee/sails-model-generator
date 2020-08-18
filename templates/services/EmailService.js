/**
 * 此代码由生成器生成，如有问题，请联系作者 https://github.com/wheelerlee
 */
const nodemailer = require('nodemailer');

module.exports = {

  /**
   * 发送邮件
   * @param {String} to 接收邮箱，多个用逗号隔开
   * @param {String} subject 邮件主题
   * @param {String} html 邮件内容
   * @param {Object} settings 一般为空，不为空表示使用这个设置发送邮件
   */
  send: async function (to, subject, html, settings) {

    try {
      if (settings || (sails.settings && sails.settings.email_settings && sails.settings.email_settings.email_host)) {

        let email_settings = settings ? settings : sails.settings.email_settings;
        let transporter = nodemailer.createTransport({
          host: email_settings.email_host,
          port: parseInt(email_settings.email_port),
          secure: parseInt(email_settings.email_secure) === 1, // true for 465, false for other ports
          auth: {
            user: email_settings.email_user, // generated ethereal user
            pass: email_settings.email_password // generated ethereal password
          }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
          from: `"${email_settings.email_sender}" <${email_settings.email_user}>`, // sender address
          to: to, // list of receivers
          subject: subject, // Subject line
          html: html // html body
        };
    
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);

        return true;

      }
    } catch (e) {
      return false;
    }

  }

};
