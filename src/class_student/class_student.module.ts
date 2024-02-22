import { Module } from '@nestjs/common';
import { ClassStudentService } from './class_student.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClassStudentModel } from './class_student.model';
import { ClassStudentRepository } from './class_student.repository';

@Module({
  imports: [SequelizeModule.forFeature([ClassStudentModel])],
  providers: [ClassStudentService, ClassStudentRepository],
  exports: [ClassStudentService],
})
export class ClassStudentModule {}
