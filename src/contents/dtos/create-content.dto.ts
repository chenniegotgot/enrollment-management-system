import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user";
import { Module } from "../../modules/module";

export class CreateContentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  owner: User;

  @ApiProperty()
  isPublished?: boolean;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  moduleId: number;

  @ApiProperty()
  module: Module;
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
