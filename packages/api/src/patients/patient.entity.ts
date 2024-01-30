import { Column, Entity, Index } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstractEntity.entity';
import { Gender } from '../common/enum/gender.enum';

@Entity()
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
}
