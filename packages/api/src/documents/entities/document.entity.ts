import { Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract-entity.entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Entity({ name: 'documents' })
export class Document extends AbstractEntity {
  @ManyToOne(() => Patient, (patient) => patient.documents)
  public patient: Patient;
}
