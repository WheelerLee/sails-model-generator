/**
 * 自动生成的系统设置类，如有需要，请自行修改
 * 系统设置相关的操作
 */

module.exports = {

  /**
   * 重置所有的设置项目
   * @param {*} json 需要保存的参数对象
   */
  reset: async function (json) {
    await Xt_setting.destroy({}); //清空所有的数据
    if (json) {
      await SystemService.saveSingleItem(null, json);
    }
    return true;
  },

  /**
   * 将设置参数对象保存到数据库
   * @param {String} key 对象的key
   * @param {*} value 对象的值
   * @param {String} parent 父级id
   */
  saveSingleItem: async function (key, value, parent) {
    if (value instanceof Array) {  //如果是数组
      if (key) {
        await Xt_setting.create({id: key, value: 'array', parent}); //保存数据的类型
      }
      for (let i in value) {
        let item = value[i];
        await SystemService.saveSingleItem(`${key || ''}_${i}`, item, key);
      }
    } else if (value instanceof Object) {
      if (key) {
        await Xt_setting.create({id: key, value: 'object', parent}); //保存数据的类型
      }
      for (let i in value) {
        let item = value[i];
        await SystemService.saveSingleItem(i, item, key);
      }
    } else {
      await Xt_setting.create({id: key, value: value, parent: parent});
    }
    return true;
  },

  /**
   * 获取所有的设置数据
   * @param {int} parent_id id
   */
  getSettings: async function (key) {

    let parent = null;
    if (key) {
      parent = await Xt_setting.findOne({id: key});
    }
    let settings = await Xt_setting.find({parent: key});
    if (parent) {
      if (parent.value === 'array') {
        let arr = [];
        for (let setting of settings) {
          arr.push(await SystemService.getSettings(setting.id));
        }
        return arr;
      } else if (parent.value === 'object') {
        let s = {};
        for (let setting of settings) {
          s[setting.id] = await SystemService.getSettings(setting.id);
        }
        return s;
      } else {
        return parent.value;
      }
    } else {
      let s = {};
      for (let setting of settings) {
        s[setting.id] = await SystemService.getSettings(setting.id);
      }
      return s;
    }

    // let settings = await Xt_setting.find({parent: key});

    // let s = {};
    // for (let setting of settings) {
    //   s[setting.id] = setting['value'];
    //   let obj = await SystemService.getSettings(setting.id);
    //   if (Object.keys(obj).length > 0) {
    //     s[setting.id] = obj;
    //   }
    // }

    return s;
  }

};
