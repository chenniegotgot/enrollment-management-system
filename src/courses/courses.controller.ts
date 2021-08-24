import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Pagination } from '../common/models/pagination';
import { Course } from '../courses/course';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { Roles } from '../common/enums/roles';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { QueryParams } from '../common/models/queryParams';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService
  ) {}

  /**
   * Retrieve a single course
   * 
   * @param id 
   * @returns The specific course details
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getCourse(@CurrentUser() user, @Param('id') id: number): Promise<Course> {
    return this.coursesService.get(user, id);
  }

  /**
   * Retrieve all courses
   * 
   * @param query 
   * @returns All courses
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getCourses(@Query() query: QueryParams): Promise<Pagination<Course>> {
    return this.coursesService.getCourses(query);
  }

  /**
   * Create new course
   * 
   * @param user 
   * @param course
   * @returns The newly created course details
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async addCourse(@CurrentUser() user, @Body() course: CreateCourseDto): Promise<Course> {
    course.userId = user.id;
    return this.coursesService.create(user, course);
  }

  /**
   * Update a single course
   * 
   * @param user 
   * @param id 
   * @param course 
   * @returns The updated course details
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async updateCourse(@CurrentUser() user, @Param('id') id: number, @Body() course: UpdateCourseDto): Promise<Course> {
    return this.coursesService.update(user, id, course);
  }

  /**
   * Delete a single course
   * 
   * @param user 
   * @param id 
   * @param course 
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async deleteCourse(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
    return this.coursesService.delete(user, id);
  }
}
