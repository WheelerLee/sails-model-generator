import {
  Column, DeepPartial, Entity, EntityTarget, getManager
} from 'typeorm';
import BaseModel from '../BaseModel';

@Entity('sys_dict')
export default class Dict extends BaseModel {
  @Column({
    type: 'varchar',
    length: 191,
    nullable: false,
    // TODO: 生成器
    unique: true
  })
  code!: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  name?: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  parent?: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  vals?: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  remarks?: string;

  // TODO: 生成器
  static parse(...entityLikes: DeepPartial<Dict>[]): Dict {
    const dict = new Dict();
    return getManager().merge(Dict, dict, ...entityLikes);
  }
}
