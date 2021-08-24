import { Module } from '@nestjs/common';
import { UsersController } from '../users/users.controller';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    CaslModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    MailService
  ],
  exports: [TypeOrmModule, MailService],
})

export class UsersModule {}
