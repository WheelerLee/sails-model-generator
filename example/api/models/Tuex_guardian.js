/**
* 家长（监护人）表
*
* @description :: TODO: 家长（监护人）表.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/
/**
 *  @deprecated
 *   暂时废弃，家长属于member表
 * @type {{attributes: {student_id: {type: string, maxLength: number, allowNull: boolean, columnType: string}, name: {type: string, maxLength: number, allowNull: boolean, columnType: string}, relationship: {type: string, maxLength: number, allowNull: boolean, columnType: string}, area_code: {type: string, maxLength: number, allowNull: boolean, columnType: string}, mobile: {type: string, maxLength: number, allowNull: boolean, columnType: string}, password: {type: string, maxLength: number, allowNull: boolean, columnType: string}, status: {type: string, maxLength: number, allowNull: boolean, columnType: string}}}}
 */
module.exports = {

  attributes: {
    student_id: {  // student_id 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    name: {  // 姓名 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    relationship: {  // 关系 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    area_code: {  // 手机号区域 
      type: 'string',
      maxLength: 20,
      allowNull: true,
      columnType: 'varchar(20)'
    },
    mobile: {  // 手机号 
      type: 'string',
      maxLength: 20,
      allowNull: true,
      columnType: 'varchar(20)'
    },
    password: {  // 密码 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    status: {  // 状态 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
  }

};

