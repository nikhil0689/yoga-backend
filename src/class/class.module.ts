import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClassRepository } from './class.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClassModel } from './class.model';
import { ClassStudentModule } from 'src/class_student/class_student.module';
import { StudentModule } from 'src/student/student.module';
import { StudentFamilyModule } from 'src/student_family/student_family.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ClassModel]),
    ClassStudentModule,
    StudentModule,
    StudentFamilyModule,
  ],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
})
export class ClassModule {}
