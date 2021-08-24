import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { Pagination } from '../common/models/pagination';
import { QueryParams } from '../common/models/queryParams';
import { BaseService } from '../common/services/base.service';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Injectable()
export class CoursesService extends BaseService<Course>{
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    public caslAbilityFactory: CaslAbilityFactory
  ) {
    super(courseRepository, caslAbilityFactory);
  } 

  /**
   * Get all courses
   * 
   * @param queryParams 
   */
  async getCourses(queryParams: QueryParams): Promise<Pagination<Course>> {
    const { limit, page, sort, sortDirection, keyword } = queryParams;
  
    let query = this.courseRepository
      .createQueryBuilder('course');

    if (limit && page) {
      const skippedItems = (page - 1) * limit;

      query = query.offset(skippedItems).limit(limit);
    }

    if (sort) {
      query.orderBy(`course.${sort}`, sortDirection);
    }

    if (keyword) {
      query = query.andWhere(`course.title like '%${keyword}%'`);
    }

    if (queryParams.where) {
      const { published, hasModules } = queryParams.where;
      if (published) {
        query.andWhere('course.isPublished = :published', { published });
      }
      if (hasModules) {
        query.leftJoinAndSelect('course.modules', 'module')
        .andWhere("module.id >= 1");
      }
    }
 
    query = query
      .leftJoinAndSelect('course.owner', 'user')
      .leftJoinAndSelect('course.subject', 'subject');

    const [ data, total ] = await query.getManyAndCount();

    return {
      page,
      limit,
      totalCount: total,
      data
    };
  }
}
