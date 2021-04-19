import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Establishments } from './entities/establishments.entity';
import { EstablishmentsController } from './establishments.controller';
import { EstablishmentsService } from './establishments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Establishments])],
  providers: [EstablishmentsService],
  controllers: [EstablishmentsController]
})
export class EstablishmentsModule {}
