import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    const verifyPassword = await bcrypt.compare(password, user.password)
    if(user && verifyPassword) {
      const { id, name, email, role } = user
      return { id, name, email, role }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      name: user.name,
      email: user.email,
      sub: user.id,
      role: user.role
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
