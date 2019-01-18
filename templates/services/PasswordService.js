/**
 * Created by liwei on 2017/8/28.
 */

var fs = require('fs');
var path = require('path');

module.exports = {

  /**
   * 将明文密码转换成密文密码
   * @param str 明文密码
   * @returns {*|string}
   */
  pwd: function (str) {
    return str;
    // return DigestService.rsa_sha256(str, fs.readFileSync(path.resolve(__dirname, '../../ssl/rsa_private_key.pem')));
  }

};
