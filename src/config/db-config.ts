import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { ClassModel } from 'src/class/class.model';
import { ClassStudentModel } from 'src/class_student/class_student.model';
import { StudentPaymentModel } from 'src/student_payment/student_payment.model';
import { StudentPaymentBalanceModel } from 'src/student_payment_balance/student_payment_balance.model';
import { UserModel } from 'src/user/user.model';
import { UserFamilyModel } from 'src/user_family/user_family.model';

export const sequelizeAsyncConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<SequelizeModuleOptions> => {
    return {
      dialect: process.env.DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      synchronize: false,
      logging: false,
      models: [
        UserModel,
        UserFamilyModel,
        ClassModel,
        ClassStudentModel,
        StudentPaymentModel,
        StudentPaymentBalanceModel,
      ],
    };
  },
};
