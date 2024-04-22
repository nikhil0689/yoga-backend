import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { StudentModule } from 'src/student/student.module';
import { StudentFamilyModule } from 'src/student_family/student_family.module';
import { ClassModule } from 'src/class/class.module';
import { StudentPaymentModule } from 'src/student_payment/student_payment.module';

@Module({
  imports: [
    ClassModule,
    StudentPaymentModule,
    StudentModule,
    StudentFamilyModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
