import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user";
import { Course } from "../../courses/course";

export class EnrollCourseDto {
  @ApiProperty()
  course: Course;

  @ApiProperty()
  owner: User;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  courseId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
