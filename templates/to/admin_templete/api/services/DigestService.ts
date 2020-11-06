/**
 * Created by liwei on 2017/8/11.
 */

import crypto from 'crypto';

export default class DigestService {
  static md5(str: string): string {
    const hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
  }

  static sha1(str: string): string {
    const hash = crypto.createHash('sha1');
    hash.update(str);
    return hash.digest('hex');
  }

  /**
   * RSA-SHA256加密
   * @param str 需要加密的字符串
   * @param key 加密的密钥
   * @returns {string}
   */
  static rsaSha256(str: string, key: string): string {
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(str);
    const res = sign.sign(key, 'base64');
    return res;
  }

  /**
   * AES/ECB/PKCS5Padding 加密
   * @param data 需要加密的字符串
   * @param key 密钥
   * @returns {string}
   */
  static aesEncryption(data: string, key: string): string {
    const iv = '';
    const clearEncoding = 'utf8';
    const cipherEncoding = 'base64';
    const cipherChunks: string[] = [];
    const cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
    cipher.setAutoPadding(true);

    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));

    return cipherChunks.join('');
  }

  /**
   * AES/ECB/PKCS5Padding 解密
   * @param data 需要解密的字符串
   * @param key 密钥
   * @returns {string}
   */
  static aesDecryption(data: string, key: string): string {
    const iv = '';
    const clearEncoding = 'utf8';
    const cipherEncoding = 'base64';
    const cipherChunks: string[] = [];
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
    decipher.setAutoPadding(true);

    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));

    return cipherChunks.join('');
  }
}
