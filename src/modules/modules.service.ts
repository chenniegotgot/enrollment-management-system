import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity } from '../entities/module.entity';
import { Pagination } from '../common/models/pagination';
import { QueryParams } from '../common/models/queryParams';
import { BaseService } from '../common/services/base.service';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Injectable()
export class ModulesService extends BaseService<ModuleEntity> {
  constructor(
    @InjectRepository(ModuleEntity) private moduleRepository: Repository<ModuleEntity>,
    public caslAbilityFactory: CaslAbilityFactory
  ) {
    super(moduleRepository, caslAbilityFactory);
  } 

  async getModules(queryParams: QueryParams): Promise<Pagination<ModuleEntity>> {
    const { limit, page, sort, sortDirection, keyword } = queryParams;
  
    let query = this.moduleRepository
      .createQueryBuilder('module');

    if (limit && page) {
      const skippedItems = (page - 1) * limit;

      query = query.offset(skippedItems).limit(limit);
    }

    if (sort) {
      query.orderBy(`module.${sort}`, sortDirection);
    }

    if (keyword) {
      query = query.andWhere(`module.title like '%${keyword}%'`);
    }
 
    if (queryParams.where) {
      const { published, hasContents } = queryParams.where;
      if (published) {
        query.andWhere('module.isPublished = :published', { published });
      }
      if (hasContents) {
        query.leftJoinAndSelect('module.contents', 'content')
      .andWhere("content.id >= 1");
      }
    }

    query = query
      .leftJoinAndSelect('module.owner', 'user')
      .leftJoinAndSelect('module.course', 'course');

    const [ data, total ] = await query.getManyAndCount();

    return {
      page,
      limit,
      totalCount: total,
      data
    };
  }

  async deleteModule(id: number) {
    return this.moduleRepository.delete(id);
  }
}
