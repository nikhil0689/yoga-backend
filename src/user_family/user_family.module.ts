import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserFamilyModel } from './user_family.model';
import { UserFamilyService } from './user_family.service';
import { UserFamilyRepository } from './user_family.repository';
import { UserFamilyController } from './user_family.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserFamilyModel])],
  controllers: [UserFamilyController],
  providers: [UserFamilyService, UserFamilyRepository],
  exports: [UserFamilyService],
})
export class UserFamilyModule {}
