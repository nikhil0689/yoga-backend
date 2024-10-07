import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClassStudentModel } from './class_student.model';
import { ClassStudent } from './class_student.entity';
import { ClassStudentMap } from './class_student.datamapper';
import { StudentModel } from 'src/student/student.model';
import { ClassModel } from 'src/class/class.model';
import { StudentClassesPropsWithCount } from 'src/student/student.entity';
import { PaginationParams } from 'src/common/pagination.entity';

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

  async getClassesByStudentId(
    id: number,
    paginationParams: PaginationParams,
  ): Promise<StudentClassesPropsWithCount> {
    const { offset, limit } = paginationParams;
    const instances = await this.classStudentModel.findAndCountAll({
      limit: limit,
      offset: offset,
      distinct: true,
      order: [['id', 'DESC']],
      where: {
        studentId: id,
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
    const paginatedResults = {
      results: instances.rows.map((e) => ClassStudentMap.toDomain(e)),
      count: instances.count,
    };

    return paginatedResults;
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

  async getStudentClassCount(studentId: number): Promise<number> {
    return await this.classStudentModel.count({
      where: {
        studentId,
      },
    });
  }
}
