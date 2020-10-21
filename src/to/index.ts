#!/usr/bin/env node
import fs from 'fs-extra';
import colors from 'colors';
import program from 'commander';
import getDBInfo from './getDBInfo';
import SqlUtils from './SqlUtils';
import { table } from 'console';
import FSUtils from './FSUtils';

require('reflect-metadata');

//设置控制台接收UTF8的字符
process.stdin.setEncoding('utf8');

//设置控制台输出的颜色
colors.setTheme({
  info: ['black', 'bold'],
  question: ['black', 'underline', 'italic'],
  warn: ['yellow', 'bold'],
  error: ['red', 'bold'],
  success: ['green', 'bold'],
  progress: ['blue']
});

program.version('7.0.0', '-v, --version', '输出当前的版本号')
  .helpOption('-h, --help', '帮助信息')
  // .option('-m, --model <model>', '指定生成的model，不指定默认会生成所有的model以及修改config等，指定model将会只生成该model的增删改查')
  // .option('--feature <feature>', '添加功能模块')
  // .option('--fc', '查询已经集成的功能模块')
  .option('-h, --host <host>', '主机，一般为IP地址')
  .option('--port <port>', '端口，默认为3306')
  .option('-u, --user <user>', '登录数据库的用户名')
  .option('-p, --password <password>', '登录数据库的密码')
  .option('-d, --database <database>', '需要连接的数据库')
  .option('-t, --table <table>', '如果不指定table将会生成基本的管理系统以及实体类')
  .option('--reset', '重置生成的管理系统，会将和admin相关的都会删除，请谨慎')
  .option('--skip', '忽略依赖添加')
  .option('--to', '生成基于TypeOrm以及TypeScript的后台，该版本将直接取消admin层级的文件夹');

program.parse(process.argv);

let reset = program.reset;
let skip = program.skip;

if (!fs.existsSync(process.cwd() + '/views/') || !fs.existsSync(process.cwd() + '/api/')
  || !fs.existsSync(process.cwd() + '/api/controllers/') || !fs.existsSync(process.cwd() + '/api/models/')
  || !fs.existsSync(process.cwd() + '/assets/') || !fs.existsSync(process.cwd() + '/config/')) {
  console.log(colors.error('请在项目根目录下运行'));
  process.exit();
}

// let {host, port, user, password, database, table} = program;

async function main() {
  const dbInfo = await getDBInfo(program);
  const connection = await SqlUtils.connect(dbInfo);
  let entities = await SqlUtils.getEntities(connection, dbInfo.database);
  await SqlUtils.genaterEntities(entities);
  connection.close();

  FSUtils.copyTypes();

}

main();


// console.log('代码生成成功，运行后请访问 http://127.0.0.1:1337/mock/add 添加基础数据');