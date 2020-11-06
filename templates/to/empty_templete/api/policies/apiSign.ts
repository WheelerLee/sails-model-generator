/**
 * APP接口默认的签名验证
 * Created at 2020-11-06 11:34
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */
// import { getRepository } from 'typeorm';
import Sails from '../../@types/sails';
// import Member from '../entities/mem/Member';
// import DigestService from '../services/DigestService';

export = async function (req: Sails.Request, res: Sails.Response, next: Sails.Proceed) {
  // const params = req.allParams();
  // const sign: string = req.headers.sign;
  // const timeStamp = req.headers.timeStamp; // 添加一个时间戳参与签名，增加破解的难度
  // let member;
  // if (params.memberId) {
  //   member = await getRepository(Member).findOne(params.memberId);
  // }
  // if (!member) {
  //   return res.json({ code: 403, msg: 'Access denied' });
  // }
  // if (member.deleted !== 0) {
  //   return res.json({ errCode: 403, msg: '账号被冻结' });
  // }
  // params.___apptoken = member.apptoken;
  // if (timeStamp) {
  //   params.___timestamp = timeStamp;
  // }
  // if (!sign) {
  //   return res.forbidden();
  // }
  // const keys = Object.keys(params);

  // keys.sort((a, b) => (a > b ? 1 : -1)); // 将name字段从小到大排序

  // let values = '';
  // for (const key of keys) {
  //   if (params[key] !== null && params[key] !== undefined) { values += params[key]; }
  // }

  // values += sails.config.api_secret_key;

  // const hex = DigestService.md5(values);
  // if (hex.toLowerCase() === sign.toLowerCase()) {
  //   return next();
  // }

  // if (params.memberId) {
  //   if (member.apptoken) {
  //     return res.json({ errCode: 403, msg: '密码错误' });
  //   }
  //   return res.json({ errCode: 403, msg: '密码错误' });
  // }
  // return res.json({ errCode: 403, msg: 'Access denied' });
};
