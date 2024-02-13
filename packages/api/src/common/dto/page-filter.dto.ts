import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { SortOrder } from '../enums/sort-order.enum';
import { ApiProperty } from '@nestjs/swagger';

export class PageFilterDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  public page: number = 1;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsPositive()
  public pageSize: number = 10;

  @IsOptional()
  public orderBy?: string;

  @ApiProperty({ example: 'patient name' })
  @IsOptional()
  @IsString()
  public keyword?: string;

  @ApiProperty({ enum: SortOrder, example: SortOrder.ASC })
  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
}
