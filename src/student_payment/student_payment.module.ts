import { Module } from '@nestjs/common';
import { StudentPaymentController } from './student_payment.controller';
import { StudentPaymentService } from './student_payment.service';
import { StudentPaymentRepository } from './student_payment.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentPaymentModel } from './student_payment.model';
import { StudentPaymentBalanceModule } from 'src/student_payment_balance/student_payment_balance.module';

@Module({
  imports: [
    SequelizeModule.forFeature([StudentPaymentModel]),
    StudentPaymentBalanceModule,
  ],
  controllers: [StudentPaymentController],
  providers: [StudentPaymentService, StudentPaymentRepository],
})
export class StudentPaymentModule {}
