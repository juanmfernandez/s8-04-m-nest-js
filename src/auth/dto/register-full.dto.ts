import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterFullDto {
  @ApiProperty({
    description: 'User email (unique)',
    nullable: false,
    minLength: 1,
    default: 'user@email.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    nullable: false,
    minLength: 8,
    default: 'Abcd123@',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  @Matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/,
    {
      message:
        'The password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  password: string;

  @ApiProperty({
    description: 'User first name',
    nullable: false,
    minLength: 1,
    default: 'FirstName',
  })
  @IsString()
  @MinLength(1)
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    nullable: false,
    minLength: 1,
    default: 'LastName',
  })
  @IsString()
  @MinLength(1)
  lastName: string;


  @ApiProperty({
    description: 'Company address',
    nullable: true,
    default: 'address',
  })
  @IsString()
  @IsOptional()
  address?: string;

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
    description: 'Company solutions',
    nullable: true,
    default: 'none',
  })

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
