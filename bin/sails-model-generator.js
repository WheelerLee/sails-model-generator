#!/usr/bin/env node
const fs = require('fs');
const colors = require('colors');
const core = require('./core');
const program = require('commander');

colors.setTheme({
  info: ['black', 'bold'],
  question: ['black', 'underline', 'italic'],
  warn: ['yellow', 'bold'],
  error: ['red', 'bold'],
  success: ['green', 'bold'],
  progress: ['blue']
});

process.stdin.setEncoding('utf8');

program.version('4.0.1', '-v, --version')
  .option('-f, --folder <folder>', '指定生成的文件夹，默认是admin');
program.parse(process.argv);

let folder = 'admin';
if (program.folder) {
  folder = program.folder;
}

if (!fs.existsSync(process.cwd() + '/views/') || !fs.existsSync(process.cwd() + '/api/')
  || !fs.existsSync(process.cwd() + '/api/controllers/') || !fs.existsSync(process.cwd() + '/api/models/')
  || !fs.existsSync(process.cwd() + '/assets/') || !fs.existsSync(process.cwd() + '/config/')) {
  console.log(colors.error('请在项目根目录下运行'));
  return;
}

core(folder);