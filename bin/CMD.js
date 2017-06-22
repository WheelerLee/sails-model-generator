/**
 * Created by liwei on 2017/6/22.
 */

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var readline = require('readline');

//创建readline接口实例
var rl = readline.createInterface({input: process.stdin, output: process.stdout});

function readLinePromise(question) {
  console.log(question);
  return new Promise(function (resolve, reject) {
    rl.question(question, function(answer) {
      resolve(answer);
    });
  });
}

module.exports = {

  readLine: async(function (question) {
    var a = await(readLinePromise(question));
    console.log(a);
    return a;
  })

};