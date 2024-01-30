import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(createUserDto: Record<string, any>): Promise<User> {
    const createdUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(createdUser);
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.userRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
