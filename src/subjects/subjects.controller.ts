import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateSubjectDto } from './dtos/update-subject.dto';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { Pagination } from '../common/models/pagination';
import { Subject } from '../subjects/subject';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { Roles } from '../common/enums/roles';
import { QueryParams } from '../common/models/queryParams';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('subjects')
export class SubjectsController {
  constructor(
    private readonly subjectsService: SubjectsService
  ) {}

  /**
   * Retrieve a single subject
   * 
   * @param id 
   * @returns The specific subject details
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async getSubject(@CurrentUser() user, @Param('id') id: number): Promise<Subject> {
    return this.subjectsService.get(user, id);
  }

  /**
   * Retrieve and return all subjects
   * 
   * @param query
   * @returns All subjects
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async getSubjects(@Query() query: QueryParams): Promise<Pagination<Subject>> {
    return this.subjectsService.getSubjects(query);
  }

  /**
   * Create a new subject
   * 
   * @param user 
   * @param subject 
   * @returns The newly created subject details
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async addSubject(@CurrentUser() user, @Body() subject: CreateSubjectDto): Promise<Subject> {
    subject.userId = user.id;
    return this.subjectsService.create(user, subject);
  }

  /**
   * Update a single subject
   * 
   * @param user 
   * @param id 
   * @param subject 
   * @returns The updated subject details
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async updateSubject(@CurrentUser() user, @Param('id') id: number, @Body() subject: UpdateSubjectDto): Promise<Subject> {
    return this.subjectsService.update(user, id, subject);
  }

  /**
   * Delete a single subject
   * 
   * @param user 
   * @param id 
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async deleteSubject(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
    return this.subjectsService.delete(user, id);
  }
}
