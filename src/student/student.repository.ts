import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudentModel } from './student.model';
import { StudentMap } from './student.datamapper';
import { Student, StudentProps } from './student.entity';
import { Op } from 'sequelize';
import { StudentFamilyModel } from 'src/student_family/student_family.model';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel(StudentModel)
    private studentModel: typeof StudentModel,
  ) {}

  /**
   * getStudentById
   * @param id
   * @returns Student with Family details
   */
  async getStudentById(id: number): Promise<Student> {
    const modelInstance = await this.studentModel.findOne({
      include: [
        {
          model: StudentFamilyModel,
          as: 'family',
        },
      ],
      where: {
        id,
      },
    });
    return StudentMap.toDomain(modelInstance);
  }

  /**
   * Get students
   * @returns Students
   */
  async getStudents(): Promise<Student[]> {
    const modelInstances = await this.studentModel.findAll();
    return modelInstances.map((e) => StudentMap.toDomain(e));
  }

  /**
   * Get student by Phone
   * @param phone
   * @returns Student
   */
  async getStudentByPhone(phone: string): Promise<Student> {
    const modelInstance = await this.studentModel.findOne({
      include: [
        {
          model: StudentFamilyModel,
          as: 'family',
        },
      ],
      where: {
        phone,
      },
    });
    return StudentMap.toDomain(modelInstance);
  }

  /**
   * Check if student exists based on the props
   * @param props
   * @returns Boolean
   */
  async getStudentCount(props: StudentProps): Promise<boolean> {
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

    const count = await this.studentModel.count(condition);
    return count === 1;
  }

  /**
   * Verify if student id exists
   * @param studentId
   * @returns boolean
   */
  async verifyStudentId(studentId: number): Promise<boolean> {
    const count = await this.studentModel.count({
      where: {
        id: studentId,
      },
    });
    return count === 1;
  }

  /**
   * Create a student
   * @param student
   * @returns student
   */
  async createStudent(student: Student): Promise<Student> {
    const raw = StudentMap.toPersistence(student);
    const studentCreated = await this.studentModel.create(raw);
    return StudentMap.toDomain(studentCreated);
  }

  /**
   * Delete a student by id.
   * @param id StudentId
   * @returns boolean
   */
  async deleteStudentById(id: number): Promise<boolean> {
    const count = await this.studentModel.destroy({ where: { id } });
    return count === 1;
  }

  /**
   * Update student by Id
   * @param id
   * @param updatedStudentEntity
   */
  async updateStudentById(
    id: number,
    updatedStudentEntity: Student,
  ): Promise<void> {
    const raw = StudentMap.toPersistence(updatedStudentEntity);
    await this.studentModel.update(raw, { where: { id } });
  }
}
