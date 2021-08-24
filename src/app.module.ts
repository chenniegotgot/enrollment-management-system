import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { config } from './config/config';
import { DatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ContentsModule } from './contents/contents.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ModulesModule } from './modules/modules.module';
import { SubjectsModule } from './subjects/subjects.module';
import { UsersModule } from './users/users.module';
import { MailService } from './mail/mail.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SubjectsModule,
    CoursesModule,
    ModulesModule,
    ContentsModule,
    EnrollmentsModule,
    CaslModule,
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [config]
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          type: process.env.MAIL_TYPE,
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
          }
        },
        defaults: {
          forceEmbeddedImages: true,
          from: '"No Reply" <noreply@example.com>',
        }
      }),
    }),
    TypeOrmModule.forRootAsync({ 
      imports: [ConfigModule],
      useClass: DatabaseConfig 
    }),
    MailService
  ],
  providers: [AppService, UsersService, MailService],
})

export class AppModule {}
