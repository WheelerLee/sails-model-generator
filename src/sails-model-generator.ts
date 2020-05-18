#!/usr/bin/env node
import fs from 'fs-extra';
import colors from 'colors';
import program from 'commander';
import Generator from './Generator';

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

program.version('5.2.0', '-v, --version', '输出当前的版本号')
  .helpOption('-h, --help', '帮助信息')
  .option('-f, --folder <folder>', '指定生成的文件夹，默认是admin，当然现在也只支持admin。别的文件夹会有路径上的bug')
  .option('-m, --model <model>', '指定生成的model，不指定默认会生成所有的model以及修改config等，指定model将会只生成该model的增删改查')
  .option('--reset', '重置生成的管理系统，会将和admin相关的都会删除，请谨慎')
  .option('--skip', '忽略依赖添加');

program.parse(process.argv);

let folder = 'admin';
if (program.folder) {
  folder = program.folder;
}
let reset = program.reset;
let skip = program.skip;

if (!fs.existsSync(process.cwd() + '/views/') || !fs.existsSync(process.cwd() + '/api/')
  || !fs.existsSync(process.cwd() + '/api/controllers/') || !fs.existsSync(process.cwd() + '/api/models/')
  || !fs.existsSync(process.cwd() + '/assets/') || !fs.existsSync(process.cwd() + '/config/')) {
  console.log(colors.error('请在项目根目录下运行'));
  process.exit();
}

let generator = new Generator(folder);
generator.generate(reset, skip, program.model);

// console.log('代码生成成功，运行后请访问 http://127.0.0.1:1337/mock/add 添加基础数据');
