/**
 * 自动生成的文件上传类，如有需要，请自行修改
 */
var moment = require('moment');
var fs = require('fs');
var uuid = require('uuid');
var axios = require('axios');
var contentDisposition = require('content-disposition');
var gm = require('gm').subClass({imageMagick: true});

module.exports = {

  /**
   * 上传文件
   * @param req
   * @returns {Promise}
   */
  uploadFile: function (req, mid_dir) {
    return new Promise(function (resolve, reject) {
      try {
        var foldName = moment().utc().utcOffset(480).format('YYYYMMDD');
        req.upload({
          maxBytes: parseInt(sails.settings.system_settings.maximum_upload_size) * 1024,
          dirname: "../../upload/" + mid_dir + foldName
        }, function whenDone(err, uploadedFiles) {
          if (err)
            return reject(err);
          else {
            var files = [];
            for (var i in uploadedFiles) {
              var file = uploadedFiles[i];
              if (file) {
                file.save_path = '/' + mid_dir + foldName;
                var fd = file.fd;
                fd = fd.replace(/\\/g, "/");
                var strStart = (fd.lastIndexOf('/')) + 1;
                file.save_name = fd.substring(strStart, fd.length);
                files.push(file);
              }
            }

            resolve(files);
          }
        });
      } catch (e) {
        reject(e);
      }
    })
    .then(UploadService.compression);
  },

  /**
   * 压缩图片
   * @param files
   * @returns {Promise.<*>}
   */
  compression: function (files) {

    var promises = [];
    for (var i in files) {
      var file = files[i];
      if (file.type.startsWith('image')) {
        var promise = new Promise(function (resolve, reject) {
          var ext_name = file.save_name.substring(file.save_name.lastIndexOf('.'), file.save_name.length);
          Promise.all([
            UploadService.resize(1024,
              process.cwd() + '/upload/' + file.save_path + '/' + file.save_name, process.cwd() + '/upload/' + file.save_path,
              uuid.v4() + ext_name),
            UploadService.resize(512,
              process.cwd() + '/upload/' + file.save_path + '/' + file.save_name, process.cwd() + '/upload/' + file.save_path,
              uuid.v4() + ext_name),
            UploadService.resize(256,
              process.cwd() + '/upload/' + file.save_path + '/' + file.save_name, process.cwd() + '/upload/' + file.save_path,
              uuid.v4() + ext_name)
          ]).then(function (out_paths) {
            file.large_name = out_paths[0];
            file.middle_name = out_paths[1];
            file.small_name = out_paths[2];
            resolve(file);
          }).catch(function (e) {
            reject(e);
          });
        });
        promises.push(promise);
      } else {
        var promise = new Promise(function (resolve, reject) {
          resolve(file);
        });
        promises.push(promise);
      }
    }
    return Promise.all(promises);

    // jimp不支持gif压缩
    // var promises = [];
    // for (var i in files) {
    //   var file = files[i];
    //   if (file.type.startsWith('image')) {
    //     var promise = new Promise(function (resolve, reject) {
    //       Jimp.read(file.fd, function (err, image) {
    //         if (err) reject(err);
    //         else {
    //           var largestSize = image.bitmap.width > image.bitmap.height ? image.bitmap.width : image.bitmap.height;
    //           var ext_name = file.save_name.substring(file.save_name.lastIndexOf('.'), file.save_name.length);
    //           var largeSize = largestSize > 1024 ? 1024 : largestSize;
    //           file.large_name = uuid.v4() + ext_name;
    //           image.scaleToFit(largeSize, largeSize)
    //             .write(process.cwd() + '/upload/' + file.save_path + '/' + file.large_name);
    //
    //           var middleSize = largestSize > 512 ? 512 : largestSize;
    //           file.middle_name = uuid.v4() + ext_name;
    //           image.scaleToFit(middleSize, middleSize)
    //             .write(process.cwd() + '/upload/' + file.save_path + '/' + file.middle_name);
    //
    //           var smallSize = largestSize > 256 ? 256 : largestSize;
    //           file.small_name = uuid.v4() + ext_name;
    //           image.scaleToFit(smallSize, smallSize)
    //             .write(process.cwd() + '/upload/' + file.save_path + '/' + file.small_name);
    //           resolve(file);
    //         }
    //       });
    //     });
    //     promises.push(promise);
    //   } else {
    //     var promise = new Promise(function (resolve, reject) {
    //       resolve(file);
    //     });
    //     promises.push(promise);
    //   }
    // }
    // return Promise.all(promises);

  },

  saveToDB: function (files) {
    var promises = [];
    for (var i in files) {
      var file = files[i];
      var promise = Attach.create({
        real_name: file.filename,
        save_name: file.save_name,
        save_path: file.save_path,
        attach_size: file.size,
        file_type: file.type,
        large_name: file.large_name,
        middle_name: file.middle_name,
        small_name: file.small_name
      }).fetch();
      promises.push(promise);
    }

    return Promise.all(promises);

  },

  uploadFromRemote: function (url, mid_dir) {

    if (!mid_dir) {
      mid_dir = 'image/';
    }

    return new Promise(function (resolve, reject) {

      axios({
        method: 'get',
        url: url,
        responseType: 'stream',
        timeout: 100000
      }).then(function (response) {

        if (response.status === 200) {

          var content_type = response.headers['content-type'];
          var size = response.headers['content-length'];

          var file_name = '';
          if (response.headers['content-disposition']) {
            file_name = contentDisposition.parse(response.headers['content-disposition']).parameters.filename;
          }
          if (response.headers['Content-Disposition']) {
            file_name = contentDisposition.parse(response.headers['Content-Disposition']).parameters.filename;
          }
          if (!file_name) {
            content_type = 'application/octet-stream';
          }


          var foldName = moment().utc().utcOffset(480).format('YYYYMMDD');
          var absolute_path = '/' + mid_dir + foldName;
          var path = process.cwd() + "/upload/" + mid_dir;
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }
          path += foldName + '/';
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }

          var ext_name = file_name.substring(file_name.lastIndexOf('.'), file_name.length);
          var save_name = uuid.v4() + ext_name;

          var stream = response.data.pipe(fs.createWriteStream(path + save_name));
          stream.on('finish', function () {
            resolve([{
              filename: file_name ? file_name : save_name,
              save_name: save_name,
              save_path: absolute_path,
              size: size ? size : 0,
              type: content_type,
              fd: path + save_name
            }]);

          });

        } else {
          reject(new Error());
        }

      }).catch(function (e) {
        reject(e);
      });

    }).then(UploadService.compression).then(UploadService.saveToDB);

  },

  resize: function (size, original_path, out_path, out_file) {
    return new Promise(function (resolve, reject) {
      gm(original_path).resize(size, size, '>').noProfile().write(out_path + '/' + out_file, function (err) {
        if (err) reject(err);
        else {
          resolve(out_file);
        }
      });
      // gm(original_path).thumb(size, size, out_path + '/' + out_file, 100, function (err, stdout, stderr, command) {
      //   if (err) reject(err);
      //   else {
      //     resolve(out_file);
      //   }
      // });
    });
  },

  /**
   * 上传附件，文件将上传包保存到附件表
   * @param req 上传的http请求
   * @param user_id 上传的用户id
   * @returns {Promise<U>|Thenable<U>|*}
   * @deprecated
   */
  uploadAttach: function (req, mid_dir) {

    if (!mid_dir) {
      mid_dir = 'image/';
    }

    return this.uploadAttachNew(req.file('avatar'), user_id, mid_dir);

  },

  /**
   * 上传附件，文件将上传包保存到附件表
   * @param upStream 上传的http请求的form字段
   * @param user_id 上传的用户id
   * @returns {Promise<U>|Thenable<U>|*}
   */
  uploadAttachNew: function (upStream, mid_dir) {

    if (!mid_dir) {
      mid_dir = 'image/';
    }
    return this.uploadFile(upStream, mid_dir).then(UploadService.saveToDB);

  }

};
