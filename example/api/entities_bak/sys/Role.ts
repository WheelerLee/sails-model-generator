import {
  Column, DeepPartial, Entity, getManager
} from 'typeorm';
import BaseModel from '../BaseModel';

@Entity('sys_role')
export default class Role extends BaseModel {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name?: string;

  static parse(...entityLikes: DeepPartial<Role>[]): Role {
    const role = new Role();
    return getManager().merge(Role, role, ...entityLikes);
  }
}
