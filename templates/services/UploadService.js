/**
 * 自动生成的文件上传类，如有需要，请自行修改
 */
const moment = require('moment');
const fs = require('fs-extra');
const uuid = require('uuid');
const axios = require('axios');
const contentDisposition = require('content-disposition');
const gm = require('gm').subClass({imageMagick: true});
const { URL } = require('url');

module.exports = {

  /**
   * 压缩图片
   * @param {int} size 压缩后的最大大小
   * @param {String} original_path 原始文件路径
   * @param {String} out_path 输出目录
   * @param {String} file_name 输出文件名
   */
  resize: function (size, original_path, out_path, file_name) {
    return new Promise(function (resolve, reject) {
      gm(original_path).resize(size, size, '>').noProfile().write(out_path + '/' + file_name, function (err) {
        if (err) reject(err);
        else {
          resolve(file_name);
        }
      });
    });
  },

  /**
   * 记录文件到数据库
   * @param {Array} files 需要记录的文件
   */
  saveToDB: function (files) {
    let promises = [];
    for (var i in files) {
      let file = files[i];
      let promise = Attach.create({
        real_name: file.filename,
        save_path: file.save_path,
        attach_size: file.size,
        file_type: file.type,
        save_name: file.save_name,
        large_name: file.large_name,
        middle_name: file.middle_name,
        small_name: file.small_name
      }).fetch();
      promises.push(promise);
    }
    return Promise.all(promises);
  },

  /**
   * 压缩上传的图片
   * @param {Array} files 上传的文件列表
   */
  compression: function(files) {
    let promises = [];
    for (let file of files) {
      var promise = new Promise(function (resolve, reject) {
        // var ext_name = file.save_name.substring(file.save_name.lastIndexOf('.'), file.save_name.length);
        if (file.type.startsWith('image')) {
          Promise.all([
            UploadService.resize(1024, file.fd, `${process.cwd()}/upload/${file.save_path}`, uuid.v4()),
            UploadService.resize(512, file.fd, `${process.cwd()}/upload/${file.save_path}`, uuid.v4()),
            UploadService.resize(256, file.fd, `${process.cwd()}/upload/${file.save_path}`, uuid.v4())
          ]).then(function (out_paths) {
            file.large_name = out_paths[0];
            file.middle_name = out_paths[1];
            file.small_name = out_paths[2];
            resolve(file);
          }).catch(function (e) {
            reject(e);
          });
        } else {
          resolve(file);
        }
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  },

  /**
   * 上传文件
   * @param {Stream} upStream 上传的文件流
   */
  upload: function(upStream) {
    return (new Promise(function(resolve, reject) {
      let foldName = moment().utc().utcOffset(480).format('YYYYMMDD');
      upStream.upload({
        maxBytes: parseInt(sails.settings.system_settings.maximum_upload_size) * 1024,
        dirname: '../../upload/' + foldName,
        saveAs: function (__newFileStream, next) {
          return next(undefined, uuid.v4());
        }
      }, function whenDone(err, files) {
        if (err) reject(err);
        else {
          for (let file of files) {
            file.save_path = '/' + foldName;
            let strStart = (file.fd.lastIndexOf('/')) + 1;
            file.save_name = file.fd.substring(strStart, file.fd.length);
          }
          resolve(files);
        }
      });
    })).then(UploadService.compression).then(UploadService.saveToDB);
  },

  /**
   * 远程下载文件，如果是图片会进行压缩
   * @param {String} url 文件链接
   */
  uploadFromRemote: function(url) {
    return axios({
      method: 'get',
      url: url,
      responseType: 'stream',
      timeout: 100000
    }).then(function (response) {
      if (response.status === 200) {
        
        var content_type = response.headers['content-type'];
        var size = response.headers['content-length'];

        if (!content_type) {
          content_type = 'application/octet-stream';
        }
        let file_name = '';
        if (response.headers['content-disposition']) {
          file_name = contentDisposition.parse(response.headers['content-disposition']).parameters.filename;
        } else if (response.headers['Content-Disposition']) {
          file_name = contentDisposition.parse(response.headers['Content-Disposition']).parameters.filename;
        } else {
          let link =  new URL(url);
          let pathnames = link.pathname.split('/');
          if (pathnames.length > 0) {
            file_name = pathnames[pathnames.length - 1];
          } else {
            file_name = uuid.v4();
          }
        }
        let foldName = moment().utc().utcOffset(480).format('YYYYMMDD');
        let path = process.cwd() + '/upload/' + foldName + '/';
        fs.ensureDirSync(path);

        let save_name = uuid.v4();
        return new Promise(function(resolve) {
          let stream = response.data.pipe(fs.createWriteStream(path + save_name));
          stream.on('finish', function() {
            resolve([{
              filename: file_name,
              save_name: save_name,
              save_path: '/' + foldName,
              size: size ? size : 0,
              type: content_type,
              fd: path + save_name
            }]);
          });
        });

      } else {
        return new Error();
      }
    }).then(UploadService.compression).then(UploadService.saveToDB);
  }

};
