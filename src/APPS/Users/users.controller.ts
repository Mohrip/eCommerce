import { Controller, Post, Body, Get, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './createUser.dto';
import { UpdateUserDto } from './updateUser.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string; }) {
    return this.usersService.login(body.email, body.password);
  }

  @UseGuards()
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return req.user;
  }

  @Patch('profile')
  async updateProfile(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    await this.usersService.update(user.id, updateUserDto);
    return this.usersService.findOneByEmail(user.email);
  }

  @Delete('profile')
  async deleteProfile(@Req() req: Request) {
    const user = req.user;
    await this.usersService.remove(user.id);
  }
}