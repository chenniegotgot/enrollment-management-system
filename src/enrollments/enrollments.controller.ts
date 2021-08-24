import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Pagination } from '../common/models/pagination';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { Roles } from '../common/enums/roles';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './enrollment';
import { EnrollCourseDto } from './dtos/enroll-course.dto';
import { UpdateEnrollmentDto } from './dtos/update-enrollment.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(
    private readonly enrollmentsService: EnrollmentsService
  ) {}

  /**
   * Retrieve a single enrollment
   * 
   * @param user 
   * @param id 
   * @returns The specific enrollment details
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getEnrollment(@CurrentUser() user, @Param('id') id: number): Promise<Enrollment> {
    return this.enrollmentsService.get(user, id);
  }

  /**
   * Retrieve all enrollments
   * 
   * @param query 
   * @returns All enrollments
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getEnrollments(@Query() query): Promise<Pagination<Enrollment>> {
    return this.enrollmentsService.getEnrollments(query);
  }

  /**
   * Enroll student to a single course
   * 
   * @param enrollment 
   * @returns The newly created enrollment details
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.STUDENT, Roles.ADMIN)
  async enrollCourse(@CurrentUser() user, @Body() enrollment: EnrollCourseDto): Promise<Enrollment> {
    enrollment.userId = user.id;
    return this.enrollmentsService.create(user, enrollment);
  }

  /**
   * Update a single enrollment
   * 
   * @param id 
   * @param enrollment 
   * @returns The updated enrollment details
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.STUDENT, Roles.ADMIN)
  async updateEnrollment(@Param('id') id: number, @Body() enrollment: UpdateEnrollmentDto): Promise<Enrollment> {
    return this.enrollmentsService.updateEnrollment(id, enrollment);
  }

  /**
   * Delete a single enrollment
   * 
   * @param id
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.STUDENT, Roles.ADMIN)
  async deleteEnrollment(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.delete(user, id);
  }
}
