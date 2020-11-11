/**
 * 上传文件服务
 * Created at 2020-11-04 18:29
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */
import path from 'path';
import moment from 'moment';
import sharp from 'sharp';
import uuid from 'uuid';
import { getRepository } from 'typeorm';
import fs from 'fs-extra';
import contentDisposition from 'content-disposition';
import Attachment from '../entities/sys/Attachment';

export enum AttachmentType {
  Small = 'smallName',
  Middle = 'middleName',
  Large = 'largeName',
}

export default class AttachmentService {
  static getUploadPath(): string {
    return (sails.config.attachment && sails.config.attachment.path)
      ? sails.config.attachment.path : path.resolve(process.cwd(), 'upload');
  }

  /**
   * 压缩图片
   * @param file 上传后的文件对象
   * @param size 压缩后width或height的最大尺寸
   * @param folder 保存的路径
   */
  static async resize(file: any, size: number, folder: string): Promise<string> {
    const ext = path.extname(file.fd);
    const fileName = `${uuid.v4()}${ext}`;
    await sharp(file.fd).resize(size).toFile(path.resolve(folder, fileName));
    return fileName;
  }

  /**
   * 文件保存到硬盘并返回文件信息
   * @param upStream
   */
  static save(upStream: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const foldName = moment().utc().utcOffset(480).format('YYYYMMDD');
      const folder = path.resolve(AttachmentService.getUploadPath(), foldName);
      upStream.upload({
        dirname: folder
      }, (err: Error, files: any) => {
        if (err) {
          reject(err);
        } else {
          const f = files.map((file) => {
            const tmpFile = file;
            tmpFile.folder = folder;
            tmpFile.savePath = foldName;
            tmpFile.saveName = file.fd.substr(file.fd.lastIndexOf(path.sep) + 1);
            return file;
          });
          resolve(f);
        }
      });
    });
  }

  /**
   * 上传文件
   * @param upStream
   */
  static async upload(upStream: any): Promise<Array<Attachment>> {
    const files = await this.save(upStream);
    const attachments: Array<Attachment> = [];
    for (const file of files) {
      // 不是gif的图片进行压缩
      if (file.type.startsWith('image') && !file.type.endsWith('gif')) {
        const promises: Array<Promise<string>> = [];
        promises.push(AttachmentService.resize(file, 256, file.folder));
        promises.push(AttachmentService.resize(file, 512, file.folder));
        promises.push(AttachmentService.resize(file, 1024, file.folder));
        const datas = await Promise.all(promises);
        if (datas.length >= 3) {
          file.smallname = datas[0];
          file.middlename = datas[1];
          file.largename = datas[2];
        }
      }
      const attachment: Attachment = new Attachment();
      attachment.realName = file.filename;
      attachment.saveName = file.saveName;
      attachment.largeName = file.largename;
      attachment.middleName = file.middlename;
      attachment.smallName = file.smallname;
      attachment.savePath = file.savePath;
      attachment.fileType = file.type;
      attachment.attachSize = file.size;
      await getRepository(Attachment).save(attachment);
      attachments.push(attachment);
    }
    return attachments;
  }

  static async getDownloadOptions(id: string, type?: AttachmentType): Promise<[any, string?]> {
    if (!id) {
      return [undefined, undefined];
    }
    const attachment = await getRepository(Attachment).findOne({
      id: id
    });
    if (!attachment) {
      return [undefined, undefined];
    }
    let fileName = attachment.saveName;
    if (type && attachment[type]) {
      fileName = attachment[type];
    }
    const filePath = path.resolve(AttachmentService.getUploadPath(), `${attachment.savePath}/${fileName}`);
    if (!fs.existsSync(filePath)) {
      return [undefined, undefined];
    }
    return [{
      'Content-Type': attachment.fileType || 'application/octet-stream',
      'Content-Disposition': contentDisposition(attachment.realName, attachment.fileType && attachment.fileType.startsWith('image') ? { type: 'inline' } : {})
    }, filePath];
  }
}
