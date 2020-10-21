import {
  Column, Entity
} from 'typeorm';
import BaseModel from '../BaseModel';

@Entity('sys_role_resource')
export default class RoleResource extends BaseModel {
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
  resourceId?: number;
}
