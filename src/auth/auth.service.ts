import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.isActive) {
      const match = await bcrypt.compare(password, user.password);
    
      if (match && user.isActive) {
        const { ...result } = user;
        return result;
      }
    } 
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      ...user
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}
