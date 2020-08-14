import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Min, IsOptional, ValidateNested, IsObject } from 'class-validator';

import { Type } from 'class-transformer';
import SortDto from './sort.dto';

export default class SearchCommonDto {
  @Min(0)
  @ApiProperty()
  length: number;

  @Min(0)
  @ApiProperty()
  page: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortDto)
  @ApiPropertyOptional()
  sort?: SortDto;
}
