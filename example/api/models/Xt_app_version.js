/**
 * Xt_app_version.js
 *
 * @description :: app的版本记录，用来设置更新等功能.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    version_code: { //版号号 内部使用
      type: 'number',
      columnType: 'integer',
      defaultsTo: 0
    },
    version_name: { //版本名 比如 1.0.0
      type: 'string',
      maxLength: 50,
      columnType: 'VARCHAR(50)',
      required: true
    },
    silence: { //是否静默更新，只有在更新bundle的情况下静默安装才有效。会在APP运行期间自动下载，在下次启动才会有效
      type: 'boolean', 
      defaultsTo: false
    },
    force_update: { //强制更新，对于非静默更新，强制更新的提示框无法关闭
      type: 'boolean', 
      defaultsTo: false
    },
    store_update: { //是否需要到市场更新，如果当前版本与更新版本之间有市场更新的版本，那么都要先进行市场更新
      type: 'boolean', 
      defaultsTo: false
    },
    platform: {
      type: 'string',
      maxLength: 50,
      columnType: 'VARCHAR(50)',
      allowNull: true
    },
    content: { //更新内容
      type: 'string',
      maxLength: 1000,
      columnType: 'VARCHAR(1000)',
      allowNull: true
    },
    url: { //下载地址
      type: 'string',
      maxLength: 256,
      columnType: 'VARCHAR(256)',
      allowNull: true
    }
  }

}