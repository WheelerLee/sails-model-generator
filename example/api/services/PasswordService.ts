/**
 * Created by liwei on 2017/8/28.
 */

// import path from 'path';
// import fs from 'fs';

export interface IPasswordService {
  /**
   * 将明文密码转换成密文
   * @param password 明文密码
   */
  pwd(password: string): string;
}

const PasswordService: IPasswordService = {
  /**
   * 将明文密码转换成密文
   * @param password 明文密码
   */
  pwd: function pwd(password: string): string {
    return password;
  }
};

module.exports = PasswordService;
