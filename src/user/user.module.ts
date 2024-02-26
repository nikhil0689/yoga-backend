import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { UserRepository } from './user.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
