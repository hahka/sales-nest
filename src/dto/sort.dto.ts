import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export default class SortDto {
  @IsString()
  @ApiProperty()
  field: string;

  @IsNumber()
  @ApiProperty()
  order: number;
}
