import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Enrollment } from './enrollment.entity';
import { ModuleEntity } from './module.entity';
import { Subject } from './subject.entity';
import { User } from './user.entity';

@Entity()
export class Course extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column()
  userId: number;

  @Column({ default: false })
  isPublished: boolean;

  @Column()
  subjectId: number;

  /**
   * Relations
   */

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  owner: User;

  @ManyToOne(() => Subject, subject => subject.id)
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @OneToMany(() => ModuleEntity, moduleEntity => moduleEntity.id)
  modules: ModuleEntity[];

  @OneToMany(() => Enrollment, enrollment => enrollment.id)
  enrollments: Enrollment[];
}
