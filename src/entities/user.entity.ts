import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
 
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string

  @Column({ default: false })
  isActive: boolean;

  @Exclude()
  @Column({ select: false })
  accessToken: string;

  @Exclude()
  @Column({ select: false })
  accessTokenExpiry: Date;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
