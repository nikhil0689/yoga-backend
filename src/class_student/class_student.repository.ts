import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClassStudentModel } from './class_student.model';
import { ClassStudent } from './class_student.entity';
import { ClassStudentMap } from './class_student.datamapper';
import { StudentModel } from 'src/student/student.model';
import { ClassModel } from 'src/class/class.model';
import { Sequelize, where } from 'sequelize';

@Injectable()
export class ClassStudentRepository {
  constructor(
    @InjectModel(ClassStudentModel)
    private classStudentModel: typeof ClassStudentModel,
  ) {}

  async createClassStudentRecords(
    classStudents: ClassStudent[],
  ): Promise<void> {
    const rawData = classStudents.map((e) => ClassStudentMap.toPersistence(e));
    await this.classStudentModel.bulkCreate(rawData);
  }

  async deleteByClassId(id: number): Promise<void> {
    await this.classStudentModel.destroy({
      where: {
        classId: id,
      },
    });
  }

  async getClassStudentRecordsById(id: number): Promise<ClassStudent[]> {
    const instances = await this.classStudentModel.findAll({
      where: {
        classId: id,
      },
      include: [
        {
          model: ClassModel,
          as: '_class',
        },
        {
          model: StudentModel,
          as: 'student',
        },
      ],
    });
    return instances.map((e) => ClassStudentMap.toDomain(e));
  }

  async getClassStudentRecords(): Promise<ClassStudent[]> {
    const instances = await this.classStudentModel.findAll({
      include: [
        {
          model: ClassModel,
          as: '_class',
        },
        {
          model: StudentModel,
          as: 'student',
        },
      ],
    });
    return instances.map((e) => ClassStudentMap.toDomain(e));
  }

  async getTotalFeeForStudentById(studentId: number): Promise<number> {
    return await this.classStudentModel.sum('fee', { where: { studentId } });
  }
}
