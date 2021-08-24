import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '../entities/subject.entity';
import { Pagination } from '../common/models/pagination';
import { QueryParams } from '../common/models/queryParams';
import { BaseService } from '../common/services/base.service';

import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Injectable()
export class SubjectsService extends BaseService<Subject> {
  constructor(
    @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
    public caslAbilityFactory: CaslAbilityFactory
  ) {
    super(subjectRepository, caslAbilityFactory);
  } 

  async getSubjects(queryParams: QueryParams): Promise<Pagination<Subject>> {
    const { limit, page, sort, sortDirection, keyword } = queryParams;
  
    let query = this.subjectRepository
      .createQueryBuilder('subject');

    if (limit && page) {
      const skippedItems = (page - 1) * limit;

      query = query.offset(skippedItems).limit(limit);
    }

    if (sort) {
      query.orderBy(`subject.${sort}`, sortDirection);
    }

    if (queryParams.where) {
      const { published, hasCourses } = queryParams.where;
      if (published) {
        query.andWhere('subject.isPublished = :published', { published });
      }
      if (hasCourses) {
        query.leftJoinAndSelect('subject.courses', 'course')
        .andWhere("course.id >= 1");
      }
    }

    if (keyword) {
      query = query.andWhere(`subject.title like '%${keyword}%'`);
    }

    query = query
      .leftJoinAndSelect('subject.owner', 'user');

    const [ data, total ] = await query.getManyAndCount();

    return {
      page,
      limit,
      totalCount: total,
      data
    };
  }
}
