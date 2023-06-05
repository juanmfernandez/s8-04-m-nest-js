import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

@Schema()
export class Company extends Document {
  @ApiProperty()
  @Prop({ unique: true })
  rutEmpresa: string;

  @ApiProperty()
  @Prop()
  razonSocial: string;

  @ApiProperty()
  @Prop()
  nombreCompleto: string;

  @ApiProperty()
  @Prop()
  contact?: string;

  @ApiProperty()
  @Prop()
  address?: string;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Prop({ array: true })
  soluciones: string[];

  @ApiProperty()
  @Prop({ default: '0' })
  ventaAnual: string;

  @ApiProperty()
  @Prop({ array: true })
  tipoOrganizacion: string[];

  @ApiProperty()
  @Prop({ array: true, ref: 'User' })
  employees: Types.ObjectId[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
