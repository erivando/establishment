import { PartialType } from '@nestjs/mapped-types'
import { EstablishmentsCreateDto } from './establishments-create.dto'

export class EstablishmentsUpdateDto extends PartialType(
  EstablishmentsCreateDto
) {}
