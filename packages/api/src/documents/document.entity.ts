import { AbstractEntity } from 'src/common/entities/abstractEntity.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Patient } from 'src/patients/patient.entity';

@Entity({ name: 'documents' })
export class Document extends AbstractEntity {
  @ManyToOne(() => Patient, (patient) => patient.documents)
  public patient: Patient;
}
