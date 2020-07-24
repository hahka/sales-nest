import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../models/product.entity';
import { ProductDTO } from '../../dto/product.dto';
import { Repository, Like } from 'typeorm';
import SearchDto from 'src/dto/search.dto';
import { ApiResponse } from 'src/shared/api-response.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  public async getImage(id: string): Promise<string | undefined> {
    const products = await this.repo.query(
      `SELECT image FROM product WHERE product.id = $1`,
      [id],
    );
    return products[0].image;
  }

  public async getById(id: string): Promise<ApiResponse<Product>> {
    return {
      data: await this.repo.findOne(id),
    };
  }

  public async getAll(): Promise<Product[]> {
    return await this.repo.find();
  }

  public async create(dto: ProductDTO): Promise<Product> {
    return this.save(dto.toEntity());
  }

  public async patch(id: string, dto: ProductDTO): Promise<Product> {
    let entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    entity = { ...entity, ...dto.toEntity() };
    return this.save(entity);
  }

  public async search(dto: SearchDto): Promise<ApiResponse<Product[]>> {
    const take = dto.length || 20;
    const skip = dto.length * dto.page || 0;
    const keyword = dto.search || '';

    const sort = {
      column: 'name',
      order: 'ASC',
    };
    if (dto.sort) {
      sort.column = dto.sort.field;
      sort.order = dto.sort.order === 1 ? 'ASC' : 'DESC';
    }

    const [result, total] = await this.repo.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      order: { [`${sort.column}`]: sort.order },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      pagination: {
        page: dto.page,
        length: result.length,
        total,
      },
    };
  }

  private save(entity: Product) {
    return this.repo.save(entity);
  }
}
