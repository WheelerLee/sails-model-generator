import { Entity, ManyToOne } from 'typeorm';
import BaseModel from '../BaseModel';
import Resource from './Resource';
import Role from './Role';

@Entity('sys_role_resource')
export default class RoleResource extends BaseModel {
  @ManyToOne(() => Role)
  role?: Role | string;

  @ManyToOne(() => Resource)
  resource?: Resource | string;
}
