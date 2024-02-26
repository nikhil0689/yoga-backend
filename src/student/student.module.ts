import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentModel } from './student.model';
import { StudentFamilyModule } from 'src/student_family/student_family.module';

@Module({
  imports: [SequelizeModule.forFeature([StudentModel]), StudentFamilyModule],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports: [StudentService],
})
export class StudentModule {}
