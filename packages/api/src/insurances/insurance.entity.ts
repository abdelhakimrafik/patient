import { AbstractEntity } from 'src/common/entities/abstractEntity.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Patient } from 'src/patients/patient.entity';

@Entity({ name: 'insurances' })
export class Insurance extends AbstractEntity {
  @Index({ fulltext: true })
  @Column()
  public name: string;

  @OneToMany(() => Patient, (patient) => patient.insurance, {
    orphanedRowAction: 'delete',
  })
  public patients: Patient[];
}
