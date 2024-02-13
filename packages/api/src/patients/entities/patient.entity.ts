import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract-entity.entity';
import { Gender } from 'src/common/enums/gender.enum';
import { Document } from 'src/documents/entities/document.entity';
import { Insurance } from 'src/insurances/entities/insurance.entity';

@Entity({ name: 'patients' })
export class Patient extends AbstractEntity {
  @Index({ fulltext: true })
  @Column({ name: 'first_name' })
  public firstName: string;

  @Index({ fulltext: true })
  @Column({ name: 'last_name' })
  public lastName: string;

  @Index({ fulltext: true })
  @Column({ name: 'card_id' })
  public cardId: string;

  @Column()
  public birthday: Date;

  @Column()
  public gender: Gender;

  @Column()
  public phone: string;

  @Column()
  public address: string;

  @Column({ name: 'additional_address' })
  public additionalAddress: string;

  @ManyToOne(() => Insurance, (insurance) => insurance.patients)
  public insurance: Insurance;

  @OneToMany(() => Document, (document) => document.patient, {
    orphanedRowAction: 'delete',
  })
  public documents: Document[];
}
