import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentFamilyModel } from './student_family.model';
import { StudentFamilyService } from './student_family.service';
import { StudentFamilyRepository } from './student_family.repository';
import { StudentFamilyController } from './student_family.controller';

@Module({
  imports: [SequelizeModule.forFeature([StudentFamilyModel])],
  controllers: [StudentFamilyController],
  providers: [StudentFamilyService, StudentFamilyRepository],
  exports: [StudentFamilyService],
})
export class StudentFamilyModule {}
