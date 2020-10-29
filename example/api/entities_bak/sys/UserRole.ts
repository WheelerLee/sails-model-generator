import {
  DeepPartial, Entity, getManager, ManyToOne
} from 'typeorm';
import BaseModel from '../BaseModel';
import Role from '../../entities/sys/Role';
import User from '../../entities/sys/User';

@Entity('sys_user_role')
export default class UserRole extends BaseModel {
  @ManyToOne(() => Role)
  role?: Role | string;

  @ManyToOne(() => User)
  user?: User | string;

  static parse(...entityLikes: DeepPartial<UserRole>[]): UserRole {
    const userRole = new UserRole();
    return getManager().merge(UserRole, userRole, ...entityLikes);
  }
}
