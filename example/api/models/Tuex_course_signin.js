/**
 * 上课打卡表
 *
 * @description :: TODO: 上课签到记录.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    /*student_id: {  // student_id
      model:"tuex_member"
    },
    teacher_id: {  // teacher_id 
      model:"tuex_member"
    },*/
    teach_orderitem_id: {  // 订单详细
      model: "tuex_courseorderitem"
    },
    /*  teachtime_id: {  // 上课时间点
        model:"tuex_teachtime"
      },*/
    topic_member: {  // 签到人 
      model: "tuex_member"
    },
    signin_date: {  // 签到时间 
      type: 'number',
      allowNull: true,
    },
    type: { //签到类型 0:上课打卡，1：下课打卡
      type: 'number',
      allowNull: true,
    },
    lat: {  // 签到位置 
      type: 'string',
      maxLength: 50,
      allowNull: true,
      columnType: 'varchar(50)'
    },
    lng: {  // 签到位置1 
      type: 'string',
      maxLength: 50,
      allowNull: true,
      columnType: 'varchar(50)'
    },
  }

};

