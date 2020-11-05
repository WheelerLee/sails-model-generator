/**
 * 错误处理
 * 会自动将错误上传到Sentry服务器
 * Created at 2020年09月21日14:47:44
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */
import Sails from '../../@types/sails';

export = function (this: Sails.HttpRequest, error: Error) {
  sails.log.error('server error', error);
  const { res } = this;
  res.view('500');
};

// module.exports = function (error) {
//   const { res } = this;
//   sails.log.error(error);
//   // if (process.env.NODE_ENV === 'production' && error) {
//   //   Sentry.captureException(error);
//   // }
//   res.view('500');
// };
