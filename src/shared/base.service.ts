import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
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

  public async getAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repo.find(options);
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

  public async search(
    dto: SearchDto,
    customSort?: ApiSort,
  ): Promise<ApiResponse<T[]>> {
    const take = dto.length || 20;
    const skip = dto.length * dto.page || 0;
    const keyword = dto.search || '';

    const sort = customSort || {
      column: 'name',
      order: SortOrder.ASC,
    };
    if (dto.sort) {
      // camelCase to snake_case
      sort.column = dto.sort.field.replace(
        /[A-Z]/g,
        letter => `_${letter.toLowerCase()}`,
      );
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

  protected delete(entityId: string) {
    return this.repo.delete(entityId);
  }

  protected getSortString(sort: ApiSort, blacklist: string[]) {
    return blacklist.includes(sort.column)
      ? sort.column
      : `LOWER(${sort.column})`;
  }
}
