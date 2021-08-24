import { ApiProperty } from "@nestjs/swagger";
export class UserDto {
  @ApiProperty()
  id: number;
 
  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  password?: string;
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
