import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IBaseService } from './iBase.service';
import { BaseEntity } from '../entities/base.entity';
import { User } from '../../entities/user.entity';
import { Actions } from '../../common/enums/actions';
import { QueryParams } from '../models/queryParams';
import { Pagination } from '../models/pagination';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';

@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T>{
  constructor(
    private readonly genericRepository: Repository<T>,
    public readonly caslAbilityFactory: CaslAbilityFactory
  ) {}

  /**
   * Get a single entity by id
   * 
   * @param id 
   */
  async get(user: User, id: number): Promise<T> {
    const data = await this.genericRepository.findOne(id);
    if (!data)
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);

    const hasPermission = this.checkPermission(Actions.READ, user, data);

    if (!hasPermission)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return data;
  }

  /**
   * Create a single entity
   * 
   * @param entity 
   */
  async create(user: User, entity: any): Promise<T>{
    const hasPermission = this.checkPermission(Actions.CREATE, user, entity);

    if (!hasPermission)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return await this.genericRepository.save(entity);
  }

  /**
   * Get all entities
   */
  async getAll(user: User, queryParams: QueryParams, entity: any): Promise<Pagination<T>> {
    const { limit, page, sort, sortDirection, keyword } = queryParams;
  
    let query = this.genericRepository
      .createQueryBuilder(entity);

    if (limit && page) {
      const skippedItems = (page - 1) * limit;

      query = query.offset(skippedItems).limit(limit);
    }

    if (sort) {
      query.orderBy(`${entity}.${sort}`, sortDirection);
    }

    if (keyword) {
      query = query.andWhere(`${entity}.title like '%${keyword}%'`);
    }

    if (queryParams.where) {
      const { published } = queryParams.where;
      if (published) {
        query.andWhere(`${entity}.isPublished = :published`, { published });
      }
    }

    query = query
      .leftJoinAndSelect(`${entity}.owner`, 'user')
      .leftJoinAndSelect(`${entity}.subject`, 'subject');

    const [ data, total ] = await query.getManyAndCount();

    return {
      page,
      limit,
      totalCount: total,
      data
    };
  }

  async update(user: User, id: number, entity: any): Promise<T> {
    const data = this.get(user, id);
    const hasPermission = this.checkPermission(Actions.UPDATE, user, data);

    if (!hasPermission)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    await this.genericRepository.update(id, { ...entity });
    return this.get(user, id);
  }

  /**
   * Delete a single entity
   * 
   * @param id 
   */
  delete(user: User, id: number) {
    const data = this.get(user, id);
    const hasPermission = this.checkPermission(Actions.DELETE, user, data);

    if (!hasPermission)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

	  this.genericRepository.delete(id);
  }

  /**
   * Check user's permission to an entity
   * 
   * @param action 
   * @param user 
   * @param data 
   */
  checkPermission(action: any, user: User, data: any): boolean {
    const ability = this.caslAbilityFactory.userAbilityFor(user);

    return ability.can(action, data);
  }
}