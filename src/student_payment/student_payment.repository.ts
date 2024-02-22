import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudentPayment } from './student_payment.entity';
import { StudentPaymentModel } from './student_payment.model';
import { StudentPaymentMap } from './student_payment.datamapper';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class StudentPaymentRepository {
  constructor(
    @InjectModel(StudentPaymentModel)
    private studentPaymentModel: typeof StudentPaymentModel,
  ) {}

  async addStudentPayment(
    studentPayment: StudentPayment,
  ): Promise<StudentPayment> {
    const raw = StudentPaymentMap.toPersistence(studentPayment);
    const instance = await this.studentPaymentModel.create(raw);
    return StudentPaymentMap.toDomain(instance);
  }

  async updateStudentPaymentById(
    id: number,
    updatedStudentPayment: StudentPayment,
  ): Promise<void> {
    const raw = StudentPaymentMap.toPersistence(updatedStudentPayment);
    await this.studentPaymentModel.update(raw, { where: { id } });
  }

  async getStudentPaymentById(id: number): Promise<StudentPayment> {
    const instance = await this.studentPaymentModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'student',
        },
      ],
      where: {
        id,
      },
    });
    return StudentPaymentMap.toDomain(instance);
  }

  async getStudentPayments(): Promise<StudentPayment[]> {
    const instances = await this.studentPaymentModel.findAll({
      include: [
        {
          model: UserModel,
          as: 'student',
        },
      ],
    });
    return instances.map((e) => StudentPaymentMap.toDomain(e));
  }

  async deleteStudentPaymentById(id: number) {
    await this.studentPaymentModel.destroy({
      where: {
        id,
      },
    });
  }
}
