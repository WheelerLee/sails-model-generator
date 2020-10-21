import {
  Column, Entity
} from 'typeorm';
import BaseModel from '../BaseModel';

@Entity('sys_user_role')
export default class UserRole extends BaseModel {
  @Column({
    type: 'int',
    width: 11,
    nullable: true,
  })
  roleId?: number;

  @Column({
    type: 'int',
    width: 11,
    nullable: true,
  })
  userId?: number;
}
