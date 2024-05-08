import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClassModel } from './class.model';
import {
  Class,
  ClassStudentPropsWithCount,
  MonthlyClassProps,
} from './class.entity';
import { ClassMap } from './class.datamapper';
import { ClassStudentModel } from 'src/class_student/class_student.model';
import { StudentModel } from 'src/student/student.model';
import { PaginationParams } from 'src/common/pagination.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectModel(ClassModel)
    private classModel: typeof ClassModel,
  ) {}

  /**
   * Get class by classId
   * @param id
   * @returns Class
   */
  async getClassById(id: number): Promise<Class> {
    const instance = await this.classModel.findOne({
      where: { id },
    });
    return ClassMap.toDomain(instance);
  }

  async getClassStudentsById(id: number) {
    const instance = await this.classModel.findOne({
      where: { id },
      include: [
        {
          model: ClassStudentModel,
          as: 'classStudents',
          attributes: ['studentId', 'fee'],
          include: [
            {
              model: StudentModel,
              as: 'student',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });
    return ClassMap.toClassStudentDomain(instance);
  }

  async getClasses(
    paginationParams: PaginationParams,
  ): Promise<ClassStudentPropsWithCount> {
    const { offset, limit } = paginationParams;
    const classes = await this.classModel.findAndCountAll({
      limit: limit,
      offset: offset,
      distinct: true,
      order: [['date', 'DESC']],
      include: [
        {
          model: ClassStudentModel,
          as: 'classStudents',
          attributes: ['studentId', 'fee'],
          include: [
            {
              model: StudentModel,
              as: 'student',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    const paginatedResults = {
      results: classes.rows.map((e) => ClassMap.toClassStudentDomain(e)),
      count: classes.count,
    };

    return paginatedResults;
  }

  async getClassesCount(): Promise<number> {
    return await this.classModel.count();
  }

  /**
   * Create a class
   * @param class object
   * @returns Class
   */
  async createClass(_class: Class): Promise<Class> {
    const raw = ClassMap.toPersistence(_class);
    const classCreated = await this.classModel.create(raw);
    return ClassMap.toDomain(classCreated);
  }

  /**
   * Update the class by id.
   * @param id Class ID
   * @param updateClassEntity
   */
  async updateClassById(id: number, updateClassEntity: Class) {
    const raw = ClassMap.toPersistence(updateClassEntity);
    await this.classModel.update(raw, { where: { id } });
  }

  /**
   * Delete a class
   * @param id
   */
  async deleteClassById(id: number) {
    await this.classModel.destroy({
      where: {
        id,
      },
    });
  }

  async getMonthlyClassesStats(year): Promise<MonthlyClassProps[]> {
    const monthlyClasses = await this.classModel.findAll({
      attributes: [
        [Sequelize.fn('YEAR', Sequelize.col('date')), 'year'],
        [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'num_classes'],
      ],
      where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), year),
      group: [
        Sequelize.fn('YEAR', Sequelize.col('date')),
        Sequelize.fn('MONTH', Sequelize.col('date')),
      ],
      order: [
        Sequelize.fn('YEAR', Sequelize.col('date')),
        Sequelize.fn('MONTH', Sequelize.col('date')),
      ],
    });

    return ClassMap.toMonthlyClassesInYearDomain(monthlyClasses);
  }
}
