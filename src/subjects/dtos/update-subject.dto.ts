import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user";
import { Course } from "../../courses/course";

export class UpdateSubjectDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  owner?: User;

  @ApiProperty()
  courses?: Course[];

  @ApiProperty()
  userId?: number;

  @ApiProperty()
  isActive?: boolean;
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
