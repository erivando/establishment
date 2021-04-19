import {
  Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put,
  UseGuards
} from '@nestjs/common';
import { EstablishmentsCreateDto } from './dto/establishments-create.dto';
import { EstablishmentsUpdateDto } from './dto/establishments-update.dto';
import { EstablishmentsService } from './establishments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('establishments')
@UseGuards(JwtAuthGuard)
export class EstablishmentsController {
  constructor(
    private readonly establishmentsService: EstablishmentsService
  ) {}

  @Get()
  findAll() {
    return this.establishmentsService.findAll()
  }

  @HttpCode(201)
  @Post()
  create(@Body() establishmentsCreateDto: EstablishmentsCreateDto) {
    return this.establishmentsService.create(establishmentsCreateDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.establishmentsService.findOne(id)
  }

  @HttpCode(201)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() establishmentsUpdateDto: EstablishmentsUpdateDto
  ) {
    return this.establishmentsService.update(id,establishmentsUpdateDto)
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.establishmentsService.delete(id)
  }
}
