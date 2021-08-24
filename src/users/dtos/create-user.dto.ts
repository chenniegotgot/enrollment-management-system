import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  accessToken?: string;

  @ApiProperty()
  accessTokenExpiry?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
