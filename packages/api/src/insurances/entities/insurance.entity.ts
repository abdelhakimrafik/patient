import { Column, Entity, Index, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract-entity.entity';
import { Patient } from 'src/patients/entities/patient.entity';

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
