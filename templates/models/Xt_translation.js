/**
 * 数据库的翻译文件，保存需要国际化的数据库内容
 * 2019-09-10 16:14.
 *
 * @author WheelerLee https://github.com/WheelerLee
 * @copyright 2019
 */
module.exports = {

  attributes: {
    language: {  //翻译的语言
      type: 'string',
      columnType: 'varchar(50)',
      maxLength: 50,
      required: true
    },
    i18n_key: { //i18n的键， language和i18n_key联合唯一约束
      type: 'string',
      columnType: 'varchar(50)',
      maxLength: 50,
      required: true
    },
    i18n_value: {  //i18n的值
      type: 'string',
      columnType: 'text',
      allowNull: true
    }
  }

};
