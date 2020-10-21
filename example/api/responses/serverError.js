/**
 * 错误处理
 * 会自动将错误上传到Sentry服务器
 * Created at 2020年09月21日14:47:44
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */
// const Sentry = require('@sentry/node');

module.exports = function (error) {
  console.log(error);
  console.log('--0000ddalw---');
  const { res } = this;
  // if (process.env.NODE_ENV === 'production' && error) {
  //   Sentry.captureException(error);
  // }
  res.view('500');
};
