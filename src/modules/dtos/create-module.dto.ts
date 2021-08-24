import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user";
import { Content } from "../../contents/content";
import { Course } from "../../courses/course";

export class CreateModuleDto {;
  @ApiProperty()
  title: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  course?: Course;

  @ApiProperty()
  owner: User;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  courseId: number;

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  contents?: Content[];
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
