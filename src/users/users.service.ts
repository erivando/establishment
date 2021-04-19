import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from './entities/users.entity'
import { UsersCreateDto } from './dto/users-create.dto'
import { UsersUpdateDto } from './dto/users-update.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersService: Repository<Users> 
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.usersService.find()
  }

  async create(usersCreateDto: UsersCreateDto)
  : Promise<UsersCreateDto> {
    const data = {
      ...usersCreateDto,
      password: await bcrypt.hash(usersCreateDto.password, 10)
    }
    return await this.usersService.save(data);
  }

  async findOne(id: number): Promise<Users> {
    return await this.usersService.findOneOrFail(id).catch(e => {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND)
    })
  }

  async update(id: number, usersUpdateDto: UsersUpdateDto) {
    const data = usersUpdateDto.password ? {
      ...usersUpdateDto,
      password: await bcrypt.hash(usersUpdateDto.password, 10)
    } : usersUpdateDto

    return await this.usersService.findOneOrFail(id).then(() => {
      this.usersService.update(id, data)
    }).catch(e => {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND)
    })
  }

  async delete(id: number): Promise<void> {
    return await this.usersService.findOneOrFail(id).then(() => {
      this.usersService.delete(id)
    }).catch(e => {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND)
    })
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    return await this.usersService.findOne({ email })
  }
}
