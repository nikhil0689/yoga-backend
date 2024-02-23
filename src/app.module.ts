import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeAsyncConfig } from './config/db-config';
import { StudentFamilyModule } from './student_family/student_family.module';
import { ClassModule } from './class/class.module';
import { ClassStudentModule } from './class_student/class_student.module';
import { StudentPaymentModule } from './student_payment/student_payment.module';
import { StudentPaymentBalanceModule } from './student_payment_balance/student_payment_balance.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync(sequelizeAsyncConfig),
    StudentModule,
    StudentFamilyModule,
    ClassModule,
    ClassStudentModule,
    StudentPaymentModule,
    StudentPaymentBalanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
