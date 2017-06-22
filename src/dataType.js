/**
 * Created by liwei on 2017/6/1.
 */
module.exports = {
  getWaterLineType: function (mysqlDataType) {
    if (['tinyint', 'smallint', 'mediumint', 'int', 'integer', 'bigint'].indexOf(mysqlDataType.toLocaleString()) >= 0) {
      return 'integer';
    }
  }
}