import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, IsPositive, IsDateString } from 'class-validator';

export class CreateDebtDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    installmentCount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    interestRate: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    dueDate: string;

    @ApiProperty()
    @IsNotEmpty()
    userId: string;
}
