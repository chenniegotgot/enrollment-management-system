import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Pagination } from '../common/models/pagination';
import { User } from './user';
import { Roles } from '../common/enums/roles';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  /**
   * Retrieve a specific user
   * 
   * @param user 
   * @param id
   * @returns The specific user details
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUser(@CurrentUser() user, @Param('id') id: number) {
    return this.usersService.get(user, id);
  }

  /**
   * Retrieve all users
   * 
   * @param query
   * @returns All users
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.ADMIN)
  async getUsers(@Query() query): Promise<Pagination<User>> {
    return this.usersService.getUsers(query);
  }

  /**
   * Create new user
   * 
   * @param query
   * @returns The newly created user details
   */
  @Post()
  async addUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.addUser(user);
  }

  /**
   * Update user
   * 
   * @param id 
   * @param user
   * @returns The updated user details 
   */
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }
}
