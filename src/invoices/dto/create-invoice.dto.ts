import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'Supplier data',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  supplier: string;

  @ApiProperty({
    description: 'Invoice amount',
    nullable: false,
    minLength: 1,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  amount: number;

  @ApiProperty({
    description: 'Invoice issue',
    nullable: false,
    minLength: 1,
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  issueDate: Date;

  @ApiProperty({
    description: 'Invoice due',
    nullable: false,
    minLength: 1,
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  dueDate: Date;

  @ApiProperty({
    description: 'Invoice detail',
    nullable: false,
    minLength: 5,
  })
  @IsString()
  detail: string;

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
