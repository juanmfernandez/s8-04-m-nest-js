import { Controller, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Debts')
@Controller('debts')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Post()
  async createDebt(@Body() createDebtDto: CreateDebtDto) {
    const createdDebt = await this.debtService.createDebt(createDebtDto);
    return createdDebt;
  }

  @Post(':userId/payments')
  async makePayment(@Param('userId') userId: string, @Body('paymentAmount') paymentAmount: number) {
    const updatedDebt = await this.debtService.updateDebtPayment(userId, paymentAmount);
    return updatedDebt;
  }

  @Post(':userId/updateMonthlyPayment')
  async updateMonthlyPayment(@Param('userId') userId: string) {
    const updatedDebt = await this.debtService.updateMonthlyPayment(userId);
    return updatedDebt;
  }
}
