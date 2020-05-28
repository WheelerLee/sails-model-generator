/**
 * Created by WheelerLee.
 * api/VersionController
 * 版本管理的控制器
 * Copyright 2020 https://github.com/WheelerLee
 */

module.exports = {

  /**
   * @api {POST} /api/version/check_update 检查APP是否有更新
   * @apiGroup version
   * @apiVersion 1.0.0
   * 
   * @apiParam {number} version_code app当前的版本号
   * @apiParam {string} platform APP运行的系统，android或者ios
   *
   * @apiSuccess {number} errCode 0: 有新版本，1: 没有新版本
   * @apiSuccess {string} msg 返回消息
   * @apiSuccess {json} data 返回数据
   */
  check_update: async function(req, res) {
    let version_code = parseInt(req.param('version_code', '1'));
    let platform = req.param('platform');
    let versions = await Xt_app_version.find({
      where: {
        version_code: {'>': version_code},
        platform: platform,
        deleted: 0
      },
      sort: 'version_code desc'
    });
    if (versions.length === 0) {
      return res.json({
        errCode: 1
      });
    }
    let current_version;
    for (const version of versions) { //从后往前查找是否存在需要去市场更新的版本，是的话就提示去市场下载
      if (version.store_update) {
        current_version = version;
        break;
      }
    }
    if (!current_version) current_version = versions[0];
    
    if (!current_version.store_update) { //如果不是市场更新的话，那么把完整的下载路径写好
      current_version.url = req.baseUrl + '/static/' + current_version.url;
    }

    return res.json({
      errCode: 0,
      data: current_version
    });
  }

};
