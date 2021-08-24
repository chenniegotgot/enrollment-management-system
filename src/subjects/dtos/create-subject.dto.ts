import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user";
import { Course } from "../../courses/course";

export class CreateSubjectDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  owner: User;

  @ApiProperty()
  courses?: Course[];

  @ApiProperty()
  userId: number;

  @ApiProperty()
  isPublished?: boolean;
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
  
}
