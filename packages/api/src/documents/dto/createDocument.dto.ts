import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePatientDto } from 'src/patients/dto/createPatient.dot';

export class CreateDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  public patient: CreatePatientDto;
}
