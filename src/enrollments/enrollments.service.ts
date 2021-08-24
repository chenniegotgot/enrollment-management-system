import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEnrollmentDto } from './dtos/update-enrollment.dto';
import { Pagination } from '../common/models/pagination';
import { QueryParams } from '../common/models/queryParams';
import { Enrollment } from '../entities/enrollment.entity';
import { BaseService } from '../common/services/base.service';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { ModuleEntity } from '../entities/module.entity';

@Injectable()
export class EnrollmentsService extends BaseService<Enrollment>{
  constructor(
    @InjectRepository(Enrollment) private enrollmentRepository: Repository<Enrollment>,
    public caslAbilityFactory: CaslAbilityFactory,
    @InjectRepository(ModuleEntity) private moduleRepository: Repository<ModuleEntity>,
  ) {
    super(enrollmentRepository, caslAbilityFactory);
  } 

  async getEnrollments(queryParams: QueryParams): Promise<Pagination<Enrollment>> {
    const { limit, page, sort, sortDirection } = queryParams;
  
    let query = this.enrollmentRepository
      .createQueryBuilder('enrollment');

    if (limit && page) {
      const skippedItems = (page - 1) * limit;

      query = query.offset(skippedItems).limit(limit);
    }

    if (sort) {
      query.orderBy(`enrollment.${sort}`, sortDirection);
    }
    
    query = query
      .leftJoinAndSelect('enrollment.owner', 'user')
      .leftJoinAndSelect('enrollment.course', 'course')

    const [ data, total ] = await query.getManyAndCount();

    return {
      page,
      limit,
      totalCount: total,
      data
    };
  }

  async updateEnrollment(id: number, enrollment: UpdateEnrollmentDto): Promise<Enrollment> {
    await this.enrollmentRepository.update(id, { ...enrollment });
    return await this.enrollmentRepository.findOne(id, {
      relations: ['enrolledModules']
    });
    
    return await this.enrollmentRepository.save({
      id: id,
      ...enrollment
    });
  }
}
