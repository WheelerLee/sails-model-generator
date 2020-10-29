import {
  Entity, ManyToOne
} from 'typeorm';
import BaseModel from '../BaseModel';
import Role from './Role';
import User from './User';

@Entity('sys_user_role')
export default class UserRole extends BaseModel {
  @ManyToOne(() => Role)
  role?: Role;

  @ManyToOne(() => User)
  user?: User;
}
