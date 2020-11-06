import {
  DeepPartial, Entity, getManager, ManyToOne
} from 'typeorm';
import BaseModel from '../BaseModel';
import Role from './Role';
import Resource from './Resource';

@Entity('sys_role_resource')
export default class RoleResource extends BaseModel {
  @ManyToOne(() => Role)
  role?: Role | string;

  @ManyToOne(() => Resource)
  resource?: Resource | string;

  static parse(...entityLikes: DeepPartial<RoleResource>[]): RoleResource {
    const roleResource = new RoleResource();
    return getManager().merge(RoleResource, roleResource, ...entityLikes);
  }
}
