import { Module } from '@nestjs/common';
import { StudentPaymentController } from './student_payment.controller';
import { StudentPaymentService } from './student_payment.service';
import { StudentPaymentRepository } from './student_payment.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentPaymentModel } from './student_payment.model';
import { StudentModule } from 'src/student/student.module';
import { StudentFamilyModule } from 'src/student_family/student_family.module';

@Module({
  imports: [
    SequelizeModule.forFeature([StudentPaymentModel]),
    StudentModule,
    StudentFamilyModule,
  ],
  controllers: [StudentPaymentController],
  providers: [StudentPaymentService, StudentPaymentRepository],
})
export class StudentPaymentModule {}
