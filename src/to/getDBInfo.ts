import qa from "./qa";

export interface DBInfo {
  host: string,
  port: number,
  user: string,
  password: string,
  database: string;
}

/**
 * 获取数据库信息
 * @param program 
 */
const getDBInfo = async function(program: any): Promise<DBInfo> {
  let {host, port, user, password, database} = program;
  host = '192.168.1.121';
  user = 'root';
  password = 'root';
  database = 'typeorm';
  if (!host) {
    host = await qa('数据库地址:');
  }
  if (!port) {
    port = 3306;
  }
  if (!user) {
    user = await qa('用户名:');
  }
  if (!password) {
    password = await qa('密码:');
  }
  if (!database) {
    database = await qa('数据库:');
  }
  return {
    host, port, user, password, database
  };
}

export default getDBInfo;