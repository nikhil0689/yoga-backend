import { Module } from '@nestjs/common';
import { StudentPaymentBalanceController } from './student_payment_balance.controller';
import { StudentPaymentBalanceService } from './student_payment_balance.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentPaymentBalanceModel } from './student_payment_balance.model';
import { StudentPaymentBalanceRepository } from './student_payment_balance.repository';

@Module({
  imports: [SequelizeModule.forFeature([StudentPaymentBalanceModel])],
  controllers: [StudentPaymentBalanceController],
  providers: [StudentPaymentBalanceService, StudentPaymentBalanceRepository],
  exports: [StudentPaymentBalanceService],
})
export class StudentPaymentBalanceModule {}
