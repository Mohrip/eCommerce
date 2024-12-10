import {IsEmail , IsNotEmpty, MinLength, IsString} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  role: string; 

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;


}