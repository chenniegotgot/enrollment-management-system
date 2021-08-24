import { ApiProperty } from "@nestjs/swagger";
import { Subject } from "../../subjects/subject";
import { Module } from "../../modules/module";
import { User } from "../../users/user";

export class CreateCourseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  icon?: string;

  @ApiProperty()
  owner: User;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  subjectId: number;

  @ApiProperty()
  isPublished?: boolean;

  @ApiProperty()
  subject?: Subject;

  @ApiProperty()
  modules?: Module[];
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
