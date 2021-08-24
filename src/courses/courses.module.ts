import { Module } from '@nestjs/common';
import { Course } from '../entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    CaslModule,
    TypeOrmModule.forFeature([Course])
  ],
  controllers: [CoursesController],
  providers: [
    CoursesService
  ],
  exports: [TypeOrmModule],
})

export class CoursesModule {}
