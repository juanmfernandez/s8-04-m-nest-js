import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateInvoiceDto {
  @ApiProperty({
    description: 'Invoice status',
    nullable: false,
    minLength: 4,
    default: 'pending',
  })
  @IsString()
  @MinLength(4)
  status: string;
}
