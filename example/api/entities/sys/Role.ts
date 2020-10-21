import {
  Column, Entity
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
}
