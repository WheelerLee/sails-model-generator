/**
 * 消息类型表
 * 2019-08-25 13:50.
 *
 * @author WheelerLee https://github.com/WheelerLee
 * @copyright 2019 
 */
module.exports = {

  attributes: {
    name: {  //资源名称
      type: 'string',
      maxLength: 100,
      columnType: 'varchar(100)',
      required: true
    },
    icon: {    //资源类型(DICT)   page_type:页面，  btn_type:按钮类型
      type: 'string',
      maxLength: 100,
      columnType: 'varchar(100)',
      required: true
    }
  }

};
