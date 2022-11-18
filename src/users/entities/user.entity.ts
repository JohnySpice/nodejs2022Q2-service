import {
  Column,
  ColumnOptions,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

const dateColumnsOptions = {
  type: 'timestamp',
  transformer: {
    from: (value: Date) => Date.parse(value.toISOString()),
    to: (value) => value,
  },
} as ColumnOptions;

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn(dateColumnsOptions)
  createdAt: number;

  @UpdateDateColumn(dateColumnsOptions)
  updatedAt: number;
}
