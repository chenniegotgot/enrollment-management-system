import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Content } from './content';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { Roles } from '../common/enums/roles';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dtos/create-content.dto';
import { UpdateContentDto } from './dtos/update-content.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { QueryParams } from '../common/models/queryParams';
import { Pagination } from '../common/models/pagination';

@Controller('contents')
export class ContentsController {
  constructor(
    private readonly contentsService: ContentsService
  ) {}

  /**
   * Retrieve a specific content
   * 
   * @param id 
   * @returns The specific content details
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getContent(@CurrentUser() user, @Param('id') id: number): Promise<Content> {
    return this.contentsService.get(user, id);
  }

  /**
   * Retrieve all contents
   * 
   * @param query 
   * @returns All contents
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getContents(@Query() query: QueryParams): Promise<Pagination<Content>> {
    return this.contentsService.getContents(query);
  }

  /**
   * Create new content
   * 
   * @param user 
   * @param content 
   * @returns The newly created content details
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async addContent(@CurrentUser() user, @Body() content: CreateContentDto): Promise<Content> {
    content.userId = user.id;
    return this.contentsService.create(user, content);
  }

  /**
   * Update a specific content
   * 
   * @param user 
   * @param id 
   * @param content 
   * @returns The updated content details
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async updateContent(@CurrentUser() user, @Param('id') id: number, @Body() content: UpdateContentDto): Promise<Content> {
    return this.contentsService.update(user, id, content);
  }

  /**
   * Delete a specific content
   * 
   * @param user 
   * @param id 
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async deleteContent(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
    return this.contentsService.delete(user, id);
  }
}
