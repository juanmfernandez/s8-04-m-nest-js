import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Debt, DebtSchema } from './entities/debt.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Debt.name, schema: DebtSchema }])],
  controllers: [DebtController],
  providers: [DebtService]
})
export class DebtModule {}
