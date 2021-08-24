import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ModuleEntity } from './module.entity';
import { User } from './user.entity';

@Entity()
export class Content extends BaseEntity {
  @Column()
  content: string;

  @Column()
  type: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column()
  moduleId: number;

  @Column()
  userId: number;

  /**
   * Relations
   */

  @ManyToOne(() => ModuleEntity, module => module.id)
  @JoinColumn({ name: 'moduleId' })
  module: ModuleEntity;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  owner: User;
}
