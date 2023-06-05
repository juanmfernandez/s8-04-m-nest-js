import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

@Schema()
export class Payment extends Document {
  @ApiProperty()
  @Prop({ default: 150000 })
  amount: number;

  @ApiProperty()
  @Prop({ default: 10 })
  interestRate: number;

  @ApiProperty()
  @Prop({ default: new Date() })
  startDate: Date;

  @ApiProperty()
  @Prop({
    default: () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 60);
      return currentDate.toISOString();
    },
  })
  paymentDeadline: Date;

  @ApiProperty()
  @Prop({ array: false, ref: 'User' })
  employeeApplied: Types.ObjectId;

  @ApiProperty()
  @Prop({ array: false, ref: 'Company' })
  company: Types.ObjectId;

  //@ApiProperty()
  //@Prop({ array: true, ref: 'Bills' })
  //bills: Types.ObjectId[];
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
