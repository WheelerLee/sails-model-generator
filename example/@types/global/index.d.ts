/// <reference types="sails" />

import * as Sails from '../sails';
// import { IDigestService } from '../../api/services/DigestService';
// import { IEmailService } from '../../api/services/EmailService';
// import { IIOTPayService } from '../../api/services/IOTPayService';
// import { IPasswordService } from '../../api/services/PasswordService';
// import { IPermissionService } from '../../api/services/PermissionService';

declare global {
  const sails: Sails.Application;
  // const Area: Sails.Model;
  // const DigestService: IDigestService;
  // const EmailService: IEmailService;
  // const IOTPayService: IIOTPayService;
  // const PasswordService: IPasswordService;
  // const PermissionService: IPermissionService;
}

export {};
