import {
  BeforeInsert, BeforeUpdate, Column, CreateDateColumn, PrimaryGeneratedColumn
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

  @Column('int', {
    width: 11,
    nullable: true,
  })
  creater?: number;

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
