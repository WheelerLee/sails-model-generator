/**
 * 消息表，只是用来做消息发送的中间表，不和消息发送记录关联
 * 2019-08-25 13:54.
 *
 * @author WheelerLee https://github.com/WheelerLee
 * @copyright 2019 
 */
module.exports = {

  attributes: {
    title: { //标题
      type: 'string',
      maxLength: 500,
      columnType: 'varchar(500)',
      allowNull: true
    },
    content: {  //消息内容，大一点，防止某些特大的消息出现
      type: 'string',
      maxLength: 10000,
      columnType: 'varchar(10000)',
      allowNull: true
    },
    url: {   //消息的链接，用来点击消息打开相关的页面，为空表示只做消息展示
      type: 'string',
      maxLength: 500,
      columnType: 'varchar(500)'
    }
  }

};
