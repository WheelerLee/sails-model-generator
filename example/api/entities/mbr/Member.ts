import {
  Column, DeepPartial, Entity, getManager
} from 'typeorm';
import BaseModel from '../BaseModel';

@Entity('mbr_member')
export default class Member extends BaseModel {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  loginName?: string;

  static parse(...entityLikes: DeepPartial<Member>[]): Member {
    const member = new Member();
    return getManager().merge(Member, member, ...entityLikes);
  }
}
