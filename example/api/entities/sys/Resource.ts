import {
  Column, DeepPartial, Entity, getManager
} from 'typeorm';
import BaseModel from '../BaseModel';

@Entity('sys_resource')
export default class Resource extends BaseModel {
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
  icon?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  path?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  resourceType?: string;

  // TODO: 权限不使用关联关系
  // @ManyToOne(() => Resource)
  @Column('int')
  parentId?: number;

  // @OneToMany(() => Resource, (resource) => resource.parent)
  // resources?: Resource[];

  // TODO: 生成器
  static parse(...entityLikes: DeepPartial<Resource>[]): Resource {
    const resource = new Resource();
    return getManager().merge(Resource, resource, ...entityLikes);
  }
}
