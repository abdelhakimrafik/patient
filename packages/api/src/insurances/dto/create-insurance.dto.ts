import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInsuranceDto {
  @ApiProperty({ example: 'CNSS' })
  @IsString()
  @IsNotEmpty()
  public name: string;
}
