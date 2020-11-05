import fs from 'fs-extra';
import Sails from '../../@types/sails';
import AttachmentService, { AttachmentType } from '../services/AttachmentService';

export async function upload(req: Sails.Request, res: Sails.Response) {
  const as = await AttachmentService.upload(req.file('file'));
  res.json(as);
}

async function sendAttachment(req: Sails.Request, res: Sails.Response, type?: AttachmentType) {
  const id = req.param('id');
  const [headers, filePath] = await AttachmentService.getDownloadOptions(id, type);
  if (headers && filePath) {
    res.set(headers);
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.notFound();
  }
}

export async function download(req: Sails.Request, res: Sails.Response) {
  sendAttachment(req, res);
}

export async function large(req: Sails.Request, res: Sails.Response) {
  sendAttachment(req, res, AttachmentType.Large);
}

export async function middle(req: Sails.Request, res: Sails.Response) {
  sendAttachment(req, res, AttachmentType.Middle);
}

export async function small(req: Sails.Request, res: Sails.Response) {
  sendAttachment(req, res, AttachmentType.Small);
}
