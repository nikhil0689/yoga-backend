import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudentModel } from './student.model';
import { StudentMap } from './student.datamapper';
import { Student, StudentProps } from './student.entity';
import { Op } from 'sequelize';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel(StudentModel)
    private studentModel: typeof StudentModel,
  ) {}

  async getStudentById(id: number): Promise<Student> {
    const modelInstance = await this.studentModel.findOne({
      where: {
        id,
      },
    });
    return StudentMap.toDomain(modelInstance);
  }

  async getStudents(): Promise<Student[]> {
    const modelInstances = await this.studentModel.findAll();
    return modelInstances.map((e) => StudentMap.toDomain(e));
  }

  async getStudent(props: StudentProps): Promise<Student> {
    const { name, phone, email } = props;
    const conditions = [];

    if (name) {
      conditions.push({ name });
    }
    if (phone) {
      conditions.push({ phone });
    }
    if (email) {
      conditions.push({ email });
    }

    const condition = {
      where: {
        [Op.or]: conditions,
      },
    };

    const modelInstance = await this.studentModel.findOne(condition);
    return StudentMap.toDomain(modelInstance);
  }

  async getStudentByPhone(phone: string): Promise<Student> {
    const modelInstance = await this.studentModel.findOne({
      where: {
        phone,
      },
    });
    return StudentMap.toDomain(modelInstance);
  }

  async getStudentByName(name: string): Promise<Student> {
    const modelInstance = await this.studentModel.findOne({
      where: {
        name,
      },
    });
    return StudentMap.toDomain(modelInstance);
  }

  async createStudent(student: Student): Promise<Student> {
    const raw = StudentMap.toPersistence(student);
    const studentCreated = await this.studentModel.create(raw);
    return StudentMap.toDomain(studentCreated);
  }

  async deleteStudentById(id: number): Promise<void> {
    await this.studentModel.destroy({ where: { id } });
  }

  async updateStudentById(
    id: number,
    updatedStudentEntity: Student,
  ): Promise<void> {
    const raw = StudentMap.toPersistence(updatedStudentEntity);
    await this.studentModel.update(raw, { where: { id } });
  }
}
