import { Module } from '@nestjs/common';
import { ModuleEntity } from '../entities/module.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    CaslModule,
    TypeOrmModule.forFeature([ModuleEntity])
  ],
  controllers: [ModulesController],
  providers: [
    ModulesService
  ],
  exports: [TypeOrmModule],
})

export class ModulesModule {}
