import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInsuranceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
