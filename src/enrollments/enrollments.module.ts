import { Module } from '@nestjs/common';
import { Enrollment } from '../entities/enrollment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
import { CaslModule } from '../casl/casl.module';
import { ModulesModule } from '../modules/modules.module';

@Module({
  imports: [
    CaslModule,
    ModulesModule,
    TypeOrmModule.forFeature([Enrollment])
  ],
  controllers: [EnrollmentsController],
  providers: [
    EnrollmentsService
  ],
  exports: [TypeOrmModule],
})

export class EnrollmentsModule {}
