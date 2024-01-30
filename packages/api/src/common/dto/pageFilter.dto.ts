import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { SortOrder } from '../enum/sortOrder.enum';

export class PageFilterDto {
  @IsNumber()
  @IsPositive()
  public page: number = 1;

  @IsNumber()
  @IsPositive()
  public pageSize: number = 10;

  @IsOptional()
  public orderBy?: string;

  @IsOptional()
  @IsString()
  public keyword?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
}
