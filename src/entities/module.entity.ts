import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Content } from './content.entity';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity()
export class ModuleEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  duration: number;
  
  @Column({ default: false })
  isPublished: boolean;

  @Column()
  courseId: number;

  @Column()
  userId: number;

  /**
   * Relations
   */

  @ManyToOne(() => Course, course => course.id)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @OneToMany(() => Content, content => content.id)
  contents: Content[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  owner: User;
}
