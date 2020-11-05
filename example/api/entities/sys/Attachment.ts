import {
  Column, DeepPartial, Entity, getManager
} from 'typeorm';
import BaseModel from '../BaseModel';

@Entity('sys_attachment')
export default class Attachment extends BaseModel {
  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  realName?: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  saveName?: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  largeName?: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  middleName?: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  smallName?: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  savePath?: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  fileType?: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  attachSize?: number;

  static parse(...entityLikes: DeepPartial<Attachment>[]): Attachment {
    const attachment = new Attachment();
    return getManager().merge(Attachment, attachment, ...entityLikes);
  }
}
