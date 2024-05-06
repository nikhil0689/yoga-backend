import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { ClassModel } from 'src/class/class.model';
import { ClassStudentModel } from 'src/class_student/class_student.model';
import { StudentPaymentModel } from 'src/student_payment/student_payment.model';
import { StudentModel } from 'src/student/student.model';
import { StudentFamilyModel } from 'src/student_family/student_family.model';
import { UserModel } from 'src/user/user.model';
import { RefreshTokenTrackerModel } from 'src/refresh-token-tracker/refresh-token-tracker.model';
import appConfig from './app-config';

export const sequelizeAsyncConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<SequelizeModuleOptions> => {
    return {
      dialect: appConfig().dialect as Dialect,
      host: appConfig().dbHost,
      port: parseInt(appConfig().dbPort, 10),
      username: appConfig().dbUserName,
      database: appConfig().dbDatabase,
      password: appConfig().dbPassword,
      synchronize: false,
      logging: false,
      models: [
        UserModel,
        StudentModel,
        StudentFamilyModel,
        ClassModel,
        ClassStudentModel,
        StudentPaymentModel,
        RefreshTokenTrackerModel,
      ],
    };
  },
};
