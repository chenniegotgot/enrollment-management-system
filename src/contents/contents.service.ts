import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../entities/content.entity';
import { BaseService } from '../common/services/base.service';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { QueryParams } from '../common/models/queryParams';
import { Pagination } from '../common/models/pagination';

@Injectable()
export class ContentsService extends BaseService<Content> {
  constructor(
    @InjectRepository(Content) private contentRepository: Repository<Content>,
    public caslAbilityFactory: CaslAbilityFactory
  ) {
    super(contentRepository, caslAbilityFactory);
  } 

  /**
   * Get all contents
   * 
   * @param queryParams 
   */
  async getContents(queryParams: QueryParams): Promise<Pagination<Content>> {
    const { limit, page, sort, sortDirection, keyword } = queryParams;
  
    let query = this.contentRepository
      .createQueryBuilder('content');

    if (limit && page) {
      const skippedItems = (page - 1) * limit;

      query = query.offset(skippedItems).limit(limit);
    }

    if (sort) {
      query.orderBy(`content.${sort}`, sortDirection);
    }

    if (queryParams.where) {
      const { published } = queryParams.where;
      query = query.andWhere('content.isPublished = :published', { published });
    }

    if (keyword) {
      query = query.andWhere(`content.content like '%${keyword}%'`);
    }

    query = query
      .leftJoinAndSelect('content.owner', 'user')
      .leftJoinAndSelect('content.module', 'module');

    const [ data, total ] = await query.getManyAndCount();

    return {
      page,
      limit,
      totalCount: total,
      data
    };
  }
}
