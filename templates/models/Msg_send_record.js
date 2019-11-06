/**
 * 消息发送记录
 * 2019-08-25 14:01.
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
    member_id: {
      type: 'number',
      columnType: 'integer',
      allowNull: true
    },
    url: {   //消息的链接，用来点击消息打开相关的页面，为空表示只做消息展示
      type: 'string',
      maxLength: 500,
      columnType: 'varchar(500)',
      allowNull: true
    },
    status: { // 0 未读， 1 已读
      type: 'number',
      columnType: 'integer',
      defaultsTo: 0
    },
    read_time: { //阅读时间
      type: 'number',
      columnType: 'integer',
      allowNull: true
    }
  }

};
