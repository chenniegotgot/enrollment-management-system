import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../entities/user.entity';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly usersService: UsersService
  ) {}
  
  /**
   * Login user
   * 
   * @param req 
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * Send reset password email
   * 
   * @param req 
   */
  @Get('password')
  async resetPassword(@Request() req) {
    const { value } = req.body
    this.usersService.resetPassword(value);
  }

  /**
   * Reset user account password
   * 
   * @param req 
   */
  @Post('password/:token')
  async changePassword(@Request() req) {
    const { value } = req.body
    this.usersService.changePassword(value);
  }

  /**
   * Create a new user account and send email verification
   * 
   * @param user 
   */
  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.addUser(user);
  }
  
  /**
   * Send a new verification email
   * 
   * @param req 
   */
  @Post('signup/verification')
  async resendVerification(@Request() req) {
    return this.usersService.resendVerificationEmail(req);
  }

  /**
   * Verify user
   * 
   * @param token 
   */
  @Get('signup/:token')
  async verifyEmail(@Param('token') token: string) {
    return this.usersService.activateUser(token);
  }

  /**
   * Logout user
   * 
   * @param req 
   */
  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  logout(@Request() req) {
    //destroy token
    req.logout();
  }
}
