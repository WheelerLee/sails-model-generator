/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  let settings = await getSetting(null);
  sails.settings = settings;
  
  return done();

};

/**
 * 获取所有的设置数据
 * @param {int} parent_id id
 */
const getSetting = async function (parent_id) {

  let settings = await Xt_setting.find({parent: parent_id});

  let s = {};
  for (let setting of settings) {
    s[setting.id] = setting['value'];
    let obj = await getSetting(setting.id);
    if (Object.keys(obj).length > 0) {
      s[setting.id] = obj;
    }
  }

  return s;

}
