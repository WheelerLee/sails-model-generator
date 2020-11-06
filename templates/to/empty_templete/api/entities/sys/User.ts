import {
  Column, DeepPartial, Entity, getManager, OneToMany
} from 'typeorm';
import BaseModel from '../BaseModel';
import UserRole from './UserRole';

@Entity('sys_user')
export default class User extends BaseModel {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  loginName?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  password?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  headIcon?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  language?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'tinyint',
    width: 1,
    nullable: true,
    default: 0,
  })
  sex?: number;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles?: UserRole[];

  static parse(...entityLikes: DeepPartial<User>[]): User {
    const user = new User();
    return getManager().merge(User, user, ...entityLikes);
  }
}
