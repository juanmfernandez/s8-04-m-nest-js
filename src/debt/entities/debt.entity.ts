import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type DebtDocument = Debt & Document;

@Schema()
export class Debt {
    @ApiProperty()
    @Prop({ required: true })
    amount: number;

    @ApiProperty()
    @Prop({ required: true })
    installmentCount: number;

    @ApiProperty()
    @Prop({ required: true })
    interestRate: number;

    @ApiProperty()
    @Prop({ required: true })
    dueDate: Date;

    @ApiProperty()
    @Prop({ ref: 'User' })
    userId: Types.ObjectId;

    @ApiProperty()
    @Prop({ default: 0 })
    paidAmount: number;

    @ApiProperty()
    @Prop({ default: true })
    isActive: boolean;

    calculateMonthlyPayment(): number {
        const monthlyInterestRate = this.interestRate / 100 / 12;
        const paymentAmount = (this.amount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -this.installmentCount));
        return paymentAmount;
    }
}

export const DebtSchema = SchemaFactory.createForClass(Debt);
