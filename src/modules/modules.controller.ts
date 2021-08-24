import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dtos/create-module.dto';
import { UpdateModuleDto } from './dtos/update-module.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { Roles } from '../common/enums/roles';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { QueryParams } from '../common/models/queryParams';
import { Module } from '../modules/module';
import { Pagination } from '../common/models/pagination';

@Controller('modules')
export class ModulesController {
  constructor(
    private readonly modulesService: ModulesService
  ) {}

  /**
   * Retrieve a specific module
   * 
   * @param id 
   * @returns The specific course details
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getModule(@CurrentUser() user, @Param('id') id: number): Promise<Module> {
    return this.modulesService.get(user, id);
  }

  /**
   * Retrieve all modules
   * 
   * @param query 
   * @returns All modules details
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getModules(@Query() query: QueryParams): Promise<Pagination<Module>> {
    return this.modulesService.getModules(query);
  }

  /**
   * Create a new module
   * 
   * @param user 
   * @param module 
   * @returns The newly created course details
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async addModule(@CurrentUser() user, @Body() module: CreateModuleDto) : Promise<Module> {
    module.userId = user.id;
    return this.modulesService.create(user, module);
  }

  /**
   * Update a single module
   * 
   * @param user 
   * @param id 
   * @param module 
   * @returns The updated course details
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async updateModule(@CurrentUser() user, @Param('id') id: number, @Body() module: UpdateModuleDto) : Promise<Module> {
    return this.modulesService.update(user, id, module);
  }

  /**
   * Delete a single module
   * 
   * @param user 
   * @param id 
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesAllowed(Roles.INSTRUCTOR)
  async deleteModule(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
    return this.modulesService.delete(user, id);
  }
}
