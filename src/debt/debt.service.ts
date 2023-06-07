import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Debt, DebtDocument } from './entities/debt.entity';
import { Model } from 'mongoose';
import { CreateDebtDto } from './dto/create-debt.dto';

@Injectable()
export class DebtService {
  constructor(
    @InjectModel(Debt.name) private debtModel: Model<DebtDocument>,
  ) {}
  async createDebt(createDebtDto: CreateDebtDto): Promise<Debt> {
    const debt = new Debt();
    debt.amount = createDebtDto.amount;
    debt.installmentCount = createDebtDto.installmentCount;
    debt.interestRate = createDebtDto.interestRate;
    debt.dueDate = new Date(createDebtDto.dueDate);
    debt.paidAmount = 0;
    debt.isActive = true;
  
    const createdDebt = new this.debtModel(debt);
    return createdDebt.save();
  }
  // async createDebt(debt: Debt): Promise<Debt> {
  //   debt.isActive = true;
  //   debt.paidAmount = 0;
  //   const createdDebt = new this.debtModel(debt);
  //   return createdDebt.save();
  // }

  async updateDebtPayment(debtId: string, paymentAmount: number): Promise<Debt> {
    const debt = await this.debtModel.findById(debtId).exec();

    if (!debt) {
      throw new NotFoundException('Debt not found.');
    }

    debt.paidAmount += paymentAmount;

    if (debt.paidAmount >= debt.amount) {
      debt.isActive = false;
    }

    return debt.save();
  }

  async updateMonthlyPayment(debtId: string): Promise<Debt> {
    const debt = await this.debtModel.findById(debtId).exec();

    if (!debt) {
      throw new NotFoundException('Debt not found.');
    }

    debt.amount = debt.calculateMonthlyPayment();

    return debt.save();
  }
}

