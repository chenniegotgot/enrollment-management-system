import { ApiProperty } from "@nestjs/swagger";
import { Subject } from "../../subjects/subject";
import { Module } from "../../modules/module";
import { User } from "../../users/user";

export class UpdateCourseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  author?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  icon?: string;

  @ApiProperty()
  isPublished?: boolean;

  @ApiProperty()
  owner?: User;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  subjectId?: number;

  @ApiProperty()
  subject?: Subject;

  @ApiProperty()
  modules?: Module[];
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
