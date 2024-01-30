import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public id: string;

  @CreateDateColumn({ name: 'created_at', default: new Date() })
  public createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', default: new Date() })
  public updatedAt: Date;
}
