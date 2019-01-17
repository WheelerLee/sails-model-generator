/**
 * Created by liwei on 2017/8/11.
 */

var crypto = require("crypto");
var fs = require('fs');

module.exports = {

  md5: function (str) {
    var sha1 = crypto.createHash('md5');
    sha1.update(str);
    return sha1.digest('hex');
  },

  sha1: function (str) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex');
  },

  /**
   * RSA-SHA256加密
   * @param str 需要加密的字符串
   * @param key 加密的密钥
   * @returns {string}
   */
  rsa_sha256: function (str, key) {
    var sign = crypto.createSign('RSA-SHA256');
    sign.update(str);
    var res = sign.sign(key, 'base64');
    return res;
  },

  /**
   * AES/ECB/PKCS5Padding 加密
   * @param data 需要加密的字符串
   * @param key 密钥
   * @returns {string}
   */
  aes_encryption: function (data, key) {
    var iv = "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
    cipher.setAutoPadding(true);

    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));

    return cipherChunks.join('');
  },

  /**
   * AES/ECB/PKCS5Padding 解密
   * @param data 需要解密的字符串
   * @param key 密钥
   * @returns {string}
   */
  aes_decryption: function (data, key) {
    var iv = "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
    decipher.setAutoPadding(true);

    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));

    return cipherChunks.join('');
  }

};
