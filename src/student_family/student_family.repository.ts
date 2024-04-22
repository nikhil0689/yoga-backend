import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudentFamilyModel } from './student_family.model';
import { StudentFamily } from './student_family.entity';
import { StudentModel } from 'src/student/student.model';
import { StudentFamilyMap } from './student_family.datamapper';

@Injectable()
export class StudentFamilyRepository {
  constructor(
    @InjectModel(StudentFamilyModel)
    private studentFamilyModel: typeof StudentFamilyModel,
  ) {}

  /**
   * Get student's family by family id
   * @param id
   * @returns StudentFamily
   */
  async getStudentFamilyById(id: number): Promise<StudentFamily> {
    const instance = await this.studentFamilyModel.findOne({
      where: {
        id,
      },
    });
    return StudentFamilyMap.toDomain(instance);
  }

  async getTotalBalance(): Promise<number> {
    return await this.studentFamilyModel.sum('balance');
  }

  /**
   * Get all student families.
   * @returns Student family
   */
  async getFamilies(): Promise<StudentFamily[]> {
    const instances = await this.studentFamilyModel.findAll({
      include: [{ model: StudentModel, as: 'owner' }],
    });
    return instances.map((e) => StudentFamilyMap.toDomain(e));
  }

  /**
   * Create a student family
   * @param family
   * @returns StudentFamily
   */
  async createFamily(family: StudentFamily): Promise<StudentFamily> {
    const raw = StudentFamilyMap.toPersistence(family);
    const instance = await this.studentFamilyModel.create(raw);
    return StudentFamilyMap.toDomain(instance);
  }

  /**
   * Update family data with the new balance.
   * @param id
   * @param studentFamily
   */
  async updateFamily(id: number, family: StudentFamily): Promise<void> {
    const raw = StudentFamilyMap.toPersistence(family);
    await this.studentFamilyModel.update(raw, {
      where: { id },
    });
  }
}
