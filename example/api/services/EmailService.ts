/**
 * 此代码由生成器生成，如有问题，请联系作者 https://github.com/wheelerlee
 */
import nodemailer from 'nodemailer';

export interface IEmailService {
  send(to: string, subject: string, html: string, settings: Object): Promise<boolean>;
}

const EmailService: IEmailService = {
  /**
   * 发送邮件
   * @param {String} to 接收邮箱，多个用逗号隔开
   * @param {String} subject 邮件主题
   * @param {String} html 邮件内容
   * @param {Object} settings 一般为空，不为空表示使用这个设置发送邮件
   */
  send: async function (to: string, subject: string,
    html: string, settings: Object): Promise<boolean> {
    try {
      if (settings || (sails.settings && sails.settings.email_settings
        && sails.settings.email_settings.email_host)) {
        const emailSettings: any = settings || sails.settings.email_settings;
        const transporter = nodemailer.createTransport({
          host: emailSettings.email_host,
          port: parseInt(emailSettings.email_port),
          secure: parseInt(emailSettings.email_secure) === 1, // true for 465, false for other ports
          auth: {
            user: emailSettings.email_user, // generated ethereal user
            pass: emailSettings.email_password // generated ethereal password
          }
        });

        // setup email data with unicode symbols
        const mailOptions = {
          from: `"${emailSettings.email_sender}" <${emailSettings.email_user}>`, // sender address
          to: to, // list of receivers
          subject: subject, // Subject line
          html: html // html body
        };

        // send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        sails.log.debug(info);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }
};

module.exports = EmailService;
