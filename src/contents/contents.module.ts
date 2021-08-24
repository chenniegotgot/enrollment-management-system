import { Module } from '@nestjs/common';
import { Content } from '../entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    CaslModule,
    TypeOrmModule.forFeature([Content])
  ],
  controllers: [ContentsController],
  providers: [
    ContentsService
  ],
  exports: [TypeOrmModule],
})

export class ContentsModule {}
