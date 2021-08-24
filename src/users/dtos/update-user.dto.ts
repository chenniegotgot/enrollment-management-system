import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
export class UpdateUserDto {
  @ApiProperty()
  id: number;
 
  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
