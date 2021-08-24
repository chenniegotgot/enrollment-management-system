import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity()
export class Subject extends BaseEntity {
  @Column()
  title: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column()
  userId: number;

  /**
   * Relations
   */

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  owner: User;

  @OneToMany(() => Course, course => course.id)
  courses: Course[];
}
