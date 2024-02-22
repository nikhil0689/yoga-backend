import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClassRepository } from './class.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClassModel } from './class.model';
import { ClassStudentModule } from 'src/class_student/class_student.module';
import { StudentPaymentBalanceModule } from 'src/student_payment_balance/student_payment_balance.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ClassModel]),
    ClassStudentModule,
    StudentPaymentBalanceModule,
  ],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
})
export class ClassModule {}
