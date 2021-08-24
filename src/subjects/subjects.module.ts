import { Module } from '@nestjs/common';
import { Subject } from '../entities/subject.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    CaslModule,
    TypeOrmModule.forFeature([Subject])
  ],
  controllers: [SubjectsController],
  providers: [
    SubjectsService
  ],
  exports: [TypeOrmModule],
})

export class SubjectsModule {}
