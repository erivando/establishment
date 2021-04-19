import {
  Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Body,
  UseGuards
} from '@nestjs/common';
import { UsersCreateDto } from './dto/users-create.dto'
import { UsersUpdateDto } from './dto/users-update.dto'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @HttpCode(201)
  @Post()
  create(@Body() usersCreateDto: UsersCreateDto) {
    return this.usersService.create(usersCreateDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usersUpdateDto: UsersUpdateDto
  ) {
    return this.usersService.update(id,usersUpdateDto)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id)
  }
}
