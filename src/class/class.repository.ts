import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClassModel } from './class.model';
import { Class } from './class.entity';
import { ClassMap } from './class.datamapper';

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
