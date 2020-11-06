/**
 * APP接口默认的签名验证
 * Created at 2020-11-06 11:34
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */
import { getRepository } from 'typeorm';
import Sails from '../../@types/sails';
import Member from '../entities/mem/Member';

export = async function (req: Sails.Request, res: Sails.Response, next: Sails.Proceed) {
  const params = req.allParams();
  const sign: string = req.headers.sign;
  const ___timestamp = req.headers.timestamp; // 添加一个时间戳参与签名，增加破解的难度
  let member;
  if (params.memberId) {
    member = await getRepository(Member).findOne(params.memberId);
  }
  if (!member) {
    return res.json({code: 403, msg: 'Access denied'});
  }
  if (member.deleted !== 0) {
    return res.json({errCode: 403, msg: '账号被冻结'});
  }
  params.___apptoken = member.apptoken;
  if (___timestamp) {
    params.___timestamp = ___timestamp;
  }
  if (!sign) {
    return res.forbidden();
  }
  let keys = [];
  for (let i in params) {
    keys.push(i);
  }

  keys.sort(function (a, b) {
    return a > b ? 1 : -1;
  });  //将name字段从小到大排序

  let values = "";
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (params[key] !== null && params[key] !== undefined)
      values += params[key];
  }

  values += sails.config.api_secret_key;

  let md5 = crypto.createHash('md5');
  md5.update(values, 'utf8');
  let hex = md5.digest('hex');

  if (hex.toLowerCase() === sign.toLowerCase()) return next();
  else {
    if (params.member_id) {
      if (member.apptoken) {
        return res.json({errCode: 403, msg: req.__('policies_sign_err')});
      } else {
        return res.json({errCode: 403, msg: req.__('policies_pwd_err')});
      }
    } else
      return res.json({errCode: 403, msg: 'Access denied'});
  }
};
