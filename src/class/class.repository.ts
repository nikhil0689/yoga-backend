import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClassModel } from './class.model';
import { Class, ClassStudentPropsWithCount } from './class.entity';
import { ClassMap } from './class.datamapper';
import { ClassStudentModel } from 'src/class_student/class_student.model';
import { StudentModel } from 'src/student/student.model';
import { PaginationParams } from 'src/common/pagination.entity';
import { Op, Sequelize } from 'sequelize';

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
      order: [['id', 'DESC']],
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

    // await this.roCollaboratorModel.findAll({
    //   attributes: [
    //     ['workspace_id', 'primaryKey'],
    //     [
    //       Sequelize.fn('COUNT', Sequelize.col('workspace_id')),
    //       'numberOfCollaborators',
    //     ],
    //   ],
    //   group: 'workspace_id',
    //   raw: true,
    //   where: {
    //     workspacePrimaryKey: {
    //       [Op.in]: workspacePrimaryKeys,
    //     },
    //   },

    // const classesForLast7Days = await this.classModel.findAll({
    //   attributes: [
    //     ['id', 'id'],
    //     [Sequelize.fn('COUNT', Sequelize.col('id')), 'classCount'],
    //   ],
    //   group: 'date',
    //   raw: true,
    //   where: {
    //     date: {
    //       [Op.gt]: new Date('2024-04-05'),
    //     },
    //   },
    // });

    // console.log(classesForLast7Days);

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
}
