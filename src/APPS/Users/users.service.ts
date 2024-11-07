// import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './users.entity';
// import { CreateUserDto } from './createUser.dto';
// import { UpdateUserDto } from './updateUser.dto';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const { email, password, role } = createUserDto;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = this.usersRepository.create({ email, password: hashedPassword, role });
//     return this.usersRepository.save(user);
//   }

//   async findOneByEmail(email: string): Promise<User> {
//     return this.usersRepository.findOne({ where: { email } });
//   }

//   async findOneById(id: number): Promise<User> {
//     const user = await this.usersRepository.findOne({ where: { id } });
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
//     return user;
//   }

//   async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
//     const { password, profile } = updateUserDto;
//     const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
//     await this.usersRepository.update(id, { ...(password && { password: hashedPassword }), ...(profile && { profile }) });
//   }

//   async remove(id: number): Promise<void> {
//     await this.usersRepository.delete(id);
//   }

//   async login(email: string, password: string): Promise<{ payload: any }> {
//     const user = await this.findOneByEmail(email);
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     const payload = { email: user.email, sub: user.id };
//     return { payload };
//   }
// }


import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './createUser.dto';
import { UpdateUserDto } from './updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password: hashedPassword, role });
    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const { password, profile } = updateUserDto;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    await this.usersRepository.update(id, { ...(password && { password: hashedPassword }), ...(profile && { profile }) });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(email: string, password: string): Promise<{ payload: any }> {
    const user = await this.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return { payload };
  }

  // Additional operations
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}