import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user";
import { Content } from "../../contents/content";
import { Course } from "../../courses/course";

export class UpdateModuleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  duration?: number;

  @ApiProperty()
  course?: Course;

  @ApiProperty()
  owner?: User;

  @ApiProperty()
  userId?: number;

  @ApiProperty()
  courseId?: number;

  @ApiProperty()
  contents?: Content[];

  @ApiProperty()
  isActive?: boolean;
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
