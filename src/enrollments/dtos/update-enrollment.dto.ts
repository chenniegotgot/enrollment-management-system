import { ApiProperty } from "@nestjs/swagger";

export class UpdateEnrollmentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  moduleId: number;
  
  @ApiProperty()
  isCompleted: boolean;

}
