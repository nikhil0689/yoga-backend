import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClassStudentModel } from './class_student.model';
import { ClassStudent } from './class_student.entity';
import { ClassStudentMap } from './class_student.datamapper';
import { StudentModel } from 'src/student/student.model';
import { ClassModel } from 'src/class/class.model';
import { Op, Sequelize, where } from 'sequelize';

@Injectable()
export class ClassStudentRepository {
  constructor(
    @InjectModel(ClassStudentModel)
    private classStudentModel: typeof ClassStudentModel,
  ) {}

  /**
   * Create Class student relationship
   * @param classStudents[]
   */
  async createClassStudentRecords(
    classStudents: ClassStudent[],
  ): Promise<void> {
    const rawData = classStudents.map((e) => ClassStudentMap.toPersistence(e));
    await this.classStudentModel.bulkCreate(rawData);
  }

  /**
   * Delete class student relationship by class id
   * @param id
   */
  async deleteByClassId(id: number): Promise<void> {
    await this.classStudentModel.destroy({
      where: {
        classId: id,
      },
    });
  }

  /**
   * Get class student records.
   * @param id
   * @returns An array of class students.
   */
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

  /**
   * Get class student records.
   * @returns Class student relationship records
   */
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
}
