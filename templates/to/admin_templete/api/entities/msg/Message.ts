import {
  Column, DeepPartial, Entity, getManager
} from 'typeorm';
import BaseModel from '../BaseModel';

@Entity('msg_message')
export default class Message extends BaseModel {
  @Column({
    type: 'varchar',
    length: 191,
    nullable: false,
  })
  title!: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: false,
  })
  content!: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  link?: string;

  static parse(...entityLikes: DeepPartial<Message>[]): Message {
    const message = new Message();
    return getManager().merge(Message, message, ...entityLikes);
  }
}
