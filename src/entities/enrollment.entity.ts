import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Course } from './course.entity';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Enrollment extends BaseEntity {
  @Column()
  courseId: number;

  @Column()
  userId: number;

  /**
   * Relations
   */

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  owner: User;

  @ManyToOne(() => Course, course => course.id)
  @JoinColumn({ name: 'courseId' })
  course: Course;
}
