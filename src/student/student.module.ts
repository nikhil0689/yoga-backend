import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentModel } from './student.model';
import { StudentFamilyModule } from 'src/student_family/student_family.module';
import { StudentPaymentBalanceModule } from 'src/student_payment_balance/student_payment_balance.module';

@Module({
  imports: [
    SequelizeModule.forFeature([StudentModel]),
    StudentFamilyModule,
    StudentPaymentBalanceModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
})
export class StudentModule {}
