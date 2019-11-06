/**
 * 此代码由生成器生成，如有问题，请联系作者 https://github.com/wheelerlee
 */
const Queue = require('promise-queue-plus');

//Realize a queue with a maximum concurrency of 1
const queue = Queue(10, {
  "retry":0,               //Number of retries
  "retryIsJump":false,     //retry now? 
  "timeout":0            //The timeout period
});

module.exports = {

  /**
   * 往用户发送一条站内消息
   * @param {int} member_id 接收用户
   * @param {Msg_message} message 需要发送的消息
   */
  send: async function(member_id, message) {
    await Msg_send_record.create({
      title: message.title,
      content: message.content,
      url: message.url,
      member_id: member_id
    });
  },

  /**
   * 往多个用户发送消息，用户过多会排队依次发送
   * @param {Xt_member[]} members 需要发送的用户
   * @param {Msg_message} message 发送的消息
   */
  send_all: function(members, message) {
    for (let member of members) {
      queue.push(function(a, b) {return MessageService.send(a, b)}, [member.id, message]);
    }
  }

};