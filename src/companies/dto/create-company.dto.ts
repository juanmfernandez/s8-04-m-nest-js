import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'RUT Company (unique)',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  rutEmpresa: string;

  @ApiProperty({
    description: 'Company legal name',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  razonSocial: string;

  @ApiProperty({
    description: 'Company full name',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  nombreCompleto: string;

  @ApiProperty({
    description: 'Company contact',
    nullable: true,
    default: '+00000000000',
  })
  @IsString()
  @IsOptional()
  contact?: string;

  @ApiProperty({
    description: 'Company address',
    nullable: true,
    default: 'address',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Company solutions',
    nullable: true,
    default: 'none',
  })
  //@IsString()
  @IsArray()
  @IsOptional()
  soluciones?: string[];

  @ApiProperty({
    description: 'Company total sales per year',
    nullable: true,
    default: '0',
  })
  @IsString()
  @IsOptional()
  ventaAnual?: string;

  @ApiProperty({
    description: 'Company type',
    nullable: true,
    default: 'none',
  })

  @IsArray()
  @IsOptional()
  tipoOrganizacion?: string[];
 
}
