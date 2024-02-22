import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { UserFamilyModule } from 'src/user_family/user_family.module';
import { StudentPaymentBalanceModule } from 'src/student_payment_balance/student_payment_balance.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    UserFamilyModule,
    StudentPaymentBalanceModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
