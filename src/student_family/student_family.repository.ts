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

  async getStudentFamilyByName(familyName: string): Promise<StudentFamily> {
    const instance = await this.studentFamilyModel.findOne({
      where: {
        familyName,
      },
    });
    return StudentFamilyMap.toDomain(instance);
  }

  async getFamilies(): Promise<StudentFamily[]> {
    const instances = await this.studentFamilyModel.findAll({
      include: [{ model: StudentModel, as: 'owner' }],
    });
    return instances.map((e) => StudentFamilyMap.toDomain(e));
  }

  async createFamily(family: StudentFamily): Promise<StudentFamily> {
    const raw = StudentFamilyMap.toPersistence(family);
    const instance = await this.studentFamilyModel.create(raw);
    return StudentFamilyMap.toDomain(instance);
  }
}
