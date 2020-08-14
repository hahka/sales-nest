import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import SearchDto from 'src/dto/search.dto';
import { ApiResponse } from 'src/shared/api-response.model';
import { BaseDTO } from './base.dto';
import { SortOrder } from './types/sort-order.enum';
import { ApiSort } from './types/api-sort.model';

@Injectable()
export abstract class BaseService<T, DTO extends BaseDTO> {
  protected readonly repo: Repository<T>;

  protected abstract findAndCount(
    keyword: string,
    sort: ApiSort,
    take: number,
    skip: number,
  ): Promise<any>;

  public async getById(id: string): Promise<ApiResponse<T>> {
    return {
      data: await this.repo.findOne(id),
    };
  }

  public async getAll(): Promise<T[]> {
    return await this.repo.find();
  }

  public async create(dto: DTO): Promise<T> {
    return this.save(dto.toEntity());
  }

  public async patch(id: string, dto: DTO): Promise<T> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    } else {
      return this.save({ ...entity, ...dto.toEntity() });
    }
  }

  public async search(dto: SearchDto): Promise<ApiResponse<T[]>> {
    const take = dto.length || 20;
    const skip = dto.length * dto.page || 0;
    const keyword = dto.search || '';

    const sort = {
      column: 'name',
      order: SortOrder.ASC,
    };
    if (dto.sort) {
      sort.column = dto.sort.field;
      sort.order = dto.sort.order === 1 ? SortOrder.ASC : SortOrder.DESC;
    }

    const [result, total] = await this.findAndCount(keyword, sort, take, skip);
    // this.repo.findAndCount({
    //   where: { name: Like('%' + keyword + '%') },
    //   order: { [`${sort.column}`]: sort.order },
    //   take,
    //   skip,
    // });

    return {
      data: result,
      pagination: {
        page: dto.page,
        length: result.length,
        total,
      },
    };
  }

  protected save(entity: T) {
    return this.repo.save(entity);
  }
}
