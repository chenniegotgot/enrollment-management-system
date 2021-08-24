import { HttpException, HttpStatus, Req } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Pagination } from '../common/models/pagination';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailService } from '../mail/mail.service';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { BaseService } from '../common/services/base.service';

export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    public caslAbilityFactory: CaslAbilityFactory,
    private readonly mailService: MailService
  ) {
    super(userRepository, caslAbilityFactory);
  } 

  /**
   * Get a single user
   * 
   * @param id 
   */
  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  /**
   * Get all users
   * 
   * @param query 
   */
  async getUsers(query): Promise<Pagination<User>> {
    const [ data, total ] = await this.userRepository.findAndCount({
      ...query
    });
    const { page, limit } = query;
    const totalCount = total;

    return {
      page,
      limit,
      totalCount,
      data
    };
  }

  /**
   * Post a single user
   * @param user 
   */
  async addUser(user: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.accessToken = crypto.randomBytes(40).toString('hex');
    user.accessTokenExpiry = new Date(new Date().setDate(new Date().getDate() + 1));

    const createdUser = await this.userRepository.save(user);
    if (!createdUser.isActive)
      await this.mailService.sendVerificationEmail(createdUser);
    return createdUser;
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ id }, { ...user });
    return this.getUser(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where : { email: email } });
  }

  async changePassword(@Req() req) {
    const { accessToken, password, verifyPassword } = req;
    const user = await this.userRepository.findOne({ where : { accessToken: accessToken } });
    if (!user) 
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);

    const match = await bcrypt.compare(verifyPassword, password);
    if (match) {
      const salt = await bcrypt.genSalt(10);
      const newPassWord = await bcrypt.hash(password, salt);
      await this.userRepository.save({
        id: user.id,
        password: newPassWord
      });

      return {
        status: "success"
      }
    }
  }
  
  async resetPassword(@Req() req) {
    const user = await this.userRepository.findOne({ where : { email: req.email } });
    if (!user) 
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    await this.mailService.sendResetPasswordEmail(user);
  }

  async resendVerificationEmail(@Req() req) {
    const user = await this.userRepository.findOne({ where : { email: req.email } });
    if (!user) 
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    await this.mailService.sendVerificationEmail(user);

    return {
      status: "success",
      message: "Email Verification Sent Succesfully."
    }
  }

  async activateUser(token: string) {
    const user = await this.userRepository.findOne({ where : { accessToken: token } });
    if (!user) 
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);

    user.isActive = true;
    await this.userRepository.save(user);

    return {
      status: "success",
      message: "Account Activated Succesfully."
    }
  }
}