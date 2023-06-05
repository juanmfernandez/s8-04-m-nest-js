import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ResetPassword extends Document {
  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  token: string;
}

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword);
