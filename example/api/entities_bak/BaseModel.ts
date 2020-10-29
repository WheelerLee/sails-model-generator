import {
  BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn
} from 'typeorm';

export default class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('tinyint', { default: 0 })
  deleted!: number;

  @Column('bigint', { width: 20 })
  createdAt!: number;

  @Column('bigint', { width: 20 })
  updatedAt!: number;

  @Column('int', { default: 1 })
  sortedNum!: number;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  creater?: string;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date().getTime();
    this.updatedAt = new Date().getTime();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date().getTime();
  }
}
