#!/usr/bin/env node
import fs from 'fs-extra';
import colors from 'colors';
import program from 'commander';
import getDBInfo from './getDBInfo';
import SqlUtils from './SqlUtils';
import FSUtils from './FSUtils';
import { getConnectionOptions } from 'typeorm';
import path from 'path';
import generateModel from './generateModel';
import { init } from './init';

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
  // .option('-h, --host <host>', '主机，一般为IP地址')
  // .option('--port <port>', '端口，默认为3306')
  // .option('-u, --user <user>', '登录数据库的用户名')
  // .option('-p, --password <password>', '登录数据库的密码')
  // .option('-d, --database <database>', '需要连接的数据库')
  .option('--init <init>', '初始化一个项目')
  .option('-e, --entity', '生成数据库的所有实体类')
  .option('-t, --table <table>', '如果不指定table将会生成基本的管理系统以及实体类')
  .option('--reset', '重置生成的管理系统，会将和admin相关的都会删除，请谨慎')
  .option('--skip', '忽略依赖添加')
  .option('--to', '生成基于TypeOrm以及TypeScript的后台，该版本将直接取消admin层级的文件夹');

program.parse(process.argv);

let reset = program.reset;
let skip = program.skip;
let entity = program.entity;

// let {host, port, user, password, database, table} = program;
let table: string = program.table;
let proName: string = program.init;

console.log(entity);
console.log(table);
console.log(proName);

async function main() {
  if (proName) {
    await init(proName);
  } else {
    if (!fs.existsSync(process.cwd() + '/views/') || !fs.existsSync(process.cwd() + '/api/')
      || !fs.existsSync(process.cwd() + '/api/controllers/')
      || !fs.existsSync(process.cwd() + '/assets/') || !fs.existsSync(process.cwd() + '/config/')) {
      console.log(colors.error('请在项目根目录下运行'));
      return;
    }
    // const dbInfo = await getDBInfo(program);
    let dbInfo = require(path.resolve(process.cwd(), 'ormconfig.json'));
    // 覆盖数据库的重写配置，防止数据库发生问题
    dbInfo.dropSchema = false;
    dbInfo.synchronize = false;
    dbInfo.entities = undefined;
    const connection = await SqlUtils.connect(dbInfo);
    let entities = await SqlUtils.getEntities(connection, dbInfo.database);
    // console.log(entities);
    if (entity) {
      // 生成所有的数据库实体类
      await SqlUtils.genaterEntities(entities);
    } else if (table) { 
      // 生成单表的增删改查
      await generateModel(entities, table);
    } else {
      FSUtils.copyTypes();
    }
    connection.close();
  }
}

main();


// console.log('代码生成成功，运行后请访问 http://127.0.0.1:1337/mock/add 添加基础数据');
