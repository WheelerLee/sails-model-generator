#!/usr/bin/env node

var fs = require('fs');
var readline = require('readline');
var Generator = require('./Generator');
const colors = require('colors');
const core = require('./core');

colors.setTheme({
  info: ['black', 'bold'],
  question: ['black', 'underline', 'italic'],
  warn: ['yellow', 'bold'],
  error: ['red', 'bold'],
  success: ['green', 'bold'],
  progress: ['blue']
});

process.stdin.setEncoding('utf8');

// if (!fs.existsSync(process.cwd() + '/views/') || !fs.existsSync(process.cwd() + '/api/')
//   || !fs.existsSync(process.cwd() + '/api/controllers/') || !fs.existsSync(process.cwd() + '/api/models/')
//   || !fs.existsSync(process.cwd() + '/assets/') || !fs.existsSync(process.cwd() + '/config/')) {
//   console.log('Please run in sails project folder');
//   return;
// }

var folderName = 'admin';
var args = process.argv;
args.splice(0, 2);

//创建readline接口实例
var rl = readline.createInterface({input: process.stdin, output: process.stdout});

if (args.length === 0) {
  
  rl.question(colors.question('Please input the prefix(admin): '), function (answer) {
    if (answer) {
      folderName = answer.toLowerCase();
    }
    core(folderName);
    rl.close();

  });
} else {
  folderName = args[0].toLowerCase();

  if (folderName === '--version' || folderName === '-v') {
    console.log(colors.info('3.1.0'));
  } else {
    core(folderName);
  }

  rl.close();
}

rl.on('close', function () {
});

return;