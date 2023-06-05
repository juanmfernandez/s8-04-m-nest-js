import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Invoice extends Document {
  @ApiProperty()
  @Prop()
  supplier: string;

  @ApiProperty()
  @Prop({ default: 0 })
  amount: number;

  @ApiProperty()
  @Prop({ default: new Date() })
  issueDate: Date;

  @ApiProperty()
  @Prop({
    default: () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 60);
      return currentDate.toISOString();
    },
  })
  dueDate: Date;

  @ApiProperty()
  @Prop()
  detail: string;

  @ApiProperty()
  @Prop()
  status: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
