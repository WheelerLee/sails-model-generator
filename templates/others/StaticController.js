/**
 * StaticController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var contentDisposition = require('content-disposition');
var fs = require('fs');

module.exports = {

  /**
   * 下载原始图片
   * @param req
   * @param res
   * @returns {Promise.<*>}
   */
  download: async function (req, res) {

    var id = req.param('id');
    if (!id || !parseInt(id)) return res.notFound();

    var ath = await Attach.findOne({id: id});

    if (!ath) return res.notFound();

    if (ath.save_path.startsWith('/pdf')) return res.notFound();

    var file_path = process.cwd() + '/upload' + ath.save_path + '/' + ath.save_name;
    if (!fs.existsSync(file_path)) {
      return res.notFound();
    }

    // res.set({
    //   'Content-Type': ath.file_type ? ath.file_type : 'application/octet-stream',
    //   'Content-Disposition': contentDisposition(ath.real_name, ath.file_type && ath.file_type.startsWith('image') ? {type: 'inline'} : {})
    // });
    // fs.createReadStream(file_path).pipe(res);
    res.download(file_path, ath.real_name);

  },

  /**
   * 获取大图，如果不存在，则返回原图
   */
  download_large: async function (req, res) {

    var id = req.param('id');
    if (!id || !parseInt(id)) return res.notFound();

    var ath = await Attach.findOne({id: id});

    if (!ath) return res.notFound();

    if (ath.save_path.startsWith('/pdf')) return res.notFound();

    var file_path = process.cwd() + '/upload' + ath.save_path + '/' + (ath.large_name ? ath.large_name : ath.save_name);
    if (!fs.existsSync(file_path)) {
      return res.notFound();
    }

    // res.set({
    //   'Content-Type': ath.file_type ? ath.file_type : 'application/octet-stream',
    //   'Content-Disposition': contentDisposition(ath.real_name, ath.file_type && ath.file_type.startsWith('image') ? {type: 'inline'} : {})
    // });

    // fs.createReadStream(file_path).pipe(res);
    // res.set('Content-Disposition', contentDisposition(ath.real_name, ath.file_type && ath.file_type.startsWith('image') ? {type: 'inline'} : {}));
    res.download(file_path, ath.real_name);

  },

  /**
   * 获取中图，如果不存在，则返回原图
   */
  download_middle: async function (req, res) {

    var id = req.param('id');
    if (!id || !parseInt(id)) return res.notFound();

    var ath = await Attach.findOne({id: id});

    if (!ath) return res.notFound();

    if (ath.save_path.startsWith('/pdf')) return res.notFound();

    var file_path = process.cwd() + '/upload' + ath.save_path + '/' + (ath.middle_name ? ath.middle_name : ath.save_name);
    if (!fs.existsSync(file_path)) {
      return res.notFound();
    }

    // res.set({
    //   'Content-Type': ath.file_type ? ath.file_type : 'application/octet-stream',
    //   'Content-Disposition': contentDisposition(ath.real_name, ath.file_type && ath.file_type.startsWith('image') ? {type: 'inline'} : {})
    // });

    // fs.createReadStream(file_path).pipe(res);
    res.download(file_path, ath.real_name);

  },

  /**
   * 获取小图，如果不存在，则返回原图
   */
  download_small: async function (req, res) {

    var id = req.param('id');
    if (!id || !parseInt(id)) return res.notFound();
    var ath = await Attach.findOne({id: id});

    if (!ath) return res.notFound();

    if (ath.save_path.startsWith('/pdf')) return res.notFound();

    var file_path = process.cwd() + '/upload' + ath.save_path + '/' + (ath.small_name ? ath.small_name : ath.save_name);
    if (!fs.existsSync(file_path)) {
      return res.notFound();
    }

    // res.set({
    //   'Content-Type': ath.file_type ? ath.file_type : 'application/octet-stream',
    //   'Content-Disposition': contentDisposition(ath.real_name, ath.file_type && ath.file_type.startsWith('image') ? {type: 'inline'} : {})
    // });

    // fs.createReadStream(file_path).pipe(res);
    res.download(file_path, ath.real_name);

  },

  /**
   * @api {post} /static/upload 上传图片
   * @apiGroup StaticController
   * @apiVersion 1.0.0
   *
   * @apiDescription 上传图片，有2种方式，一种是通过url的方式，服务器会自动下载图片并保持，一种是通过form形式传递
   *
   * @apiParam {String} url 图片链接，二选一
   * @apiParam {file} file 图片，二选一
   *
   */
  upload: async function (req, res) {
    
    try {
      let files;
      if (req.param('url')) {
        files = await UploadService.uploadFromRemote(req.param('url'));
      } else {
        files = await UploadService.uploadAttachNew(req.file('file'));
      }

      res.json({
        errCode: 0,
        data: files,
        msg: '上传成功'
      });
    } catch (e) {
      res.json({
        errCode: 500,
        msg: '上传失败'
      });
    }

  }

};

