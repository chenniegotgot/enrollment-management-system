import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user";
import { Module } from "../../modules/module";

export class UpdateContentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  isPublished?: boolean;

  @ApiProperty()
  userId?: number;

  @ApiProperty()
  moduleId?: number;

  @ApiProperty()
  module?: Module;

  @ApiProperty()
  owner?: User;
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
