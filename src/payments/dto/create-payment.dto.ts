import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { IsString, MinLength } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Loan amount',
    nullable: false,
    minLength: 1,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  amount: number;

  @ApiProperty({
    description: 'Interest rate',
    nullable: false,
    minLength: 1,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  interestRate: number;

  @ApiProperty({
    description: 'Payment Deadline',
    nullable: false,
    minLength: 1,
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  paymentDeadline: Date;

  @ApiProperty({
    description: 'Employee id',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  employeeApplied: string;

  @ApiProperty({
    description: 'Company id',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  company: string;

  /*
    @ApiProperty({
        description: 'Bills id',
        nullable: false,
        minLength: 1,
    })
    @IsArray()
    bills: string[];
  */
}
