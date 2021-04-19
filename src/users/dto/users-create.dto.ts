import { IsNotEmpty, IsString, IsEmail } from 'class-validator'
import { UserRole } from '../entities/users.entity';

export class UsersCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  role: UserRole;
}
