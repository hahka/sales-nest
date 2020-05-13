import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

import SearchCommonDto from './search-common.dto';
import { IsOptional, IsDefined } from 'class-validator';

export default class SearchDto extends SearchCommonDto {
  @IsDefined()
  @ApiProperty()
  search: string;

  @IsOptional()
  @ApiPropertyOptional()
  isArchived?: boolean;
}
