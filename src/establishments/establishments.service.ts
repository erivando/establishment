import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EstablishmentsCreateDto } from './dto/establishments-create.dto';
import { EstablishmentsUpdateDto } from './dto/establishments-update.dto';
import { Establishments } from './entities/establishments.entity'

@Injectable()
export class EstablishmentsService {
  constructor(
    @InjectRepository(Establishments)
    private establishmentsRepository: Repository<Establishments>,
  ) {}

  async findAll(): Promise<Establishments[]> {
    return await this.establishmentsRepository.find()
  }

  async create(establishmentsCreateDto: EstablishmentsCreateDto)
  : Promise<EstablishmentsCreateDto> {
    return await this.establishmentsRepository.save(establishmentsCreateDto)
  }

  async findOne(id: number): Promise<Establishments> {
    return await this.establishmentsRepository.findOneOrFail(id).catch(e => {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND)
    })
  }

  async update(id: number, establishmentsUpdateDto: EstablishmentsUpdateDto) {
    return await this.establishmentsRepository.findOneOrFail(id).then(() => {
      this.establishmentsRepository.update(id, establishmentsUpdateDto)
    }).catch(e => {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND)
    })
  }

  async delete(id: number): Promise<void> {
    return await this.establishmentsRepository.findOneOrFail(id).then(() => {
      this.establishmentsRepository.delete(id)
    }).catch(e => {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND)
    })
  }
}
