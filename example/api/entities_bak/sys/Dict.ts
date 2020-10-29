import {
  Column, DeepPartial, Entity, getManager, Unique
} from 'typeorm';
import BaseModel from '../BaseModel';

@Entity('sys_dict')
@Unique(['code', 'name'])
export default class Dict extends BaseModel {
  @Column({
    type: 'varchar',
    length: 191,
    nullable: false,
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
    unique: true,
  })
  vals?: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  remarks?: string;

  static parse(...entityLikes: DeepPartial<Dict>[]): Dict {
    const dict = new Dict();
    return getManager().merge(Dict, dict, ...entityLikes);
  }
}
