import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudentPaymentBalanceModel } from './student_payment_balance.model';
import { StudentPaymentBalance } from './student_payment_balance.entity';
import { StudentPaymentBalanceMap } from './student_payment_balance.datamapper';
import { StudentModel } from 'src/student/student.model';

@Injectable()
export class StudentPaymentBalanceRepository {
  constructor(
    @InjectModel(StudentPaymentBalanceModel)
    private studentPaymentBalanceModel: typeof StudentPaymentBalanceModel,
  ) {}

  async addStudentPaymentBalance(
    studentPaymentBalance: StudentPaymentBalance,
  ): Promise<void> {
    const raw = StudentPaymentBalanceMap.toPersistence(studentPaymentBalance);
    await this.studentPaymentBalanceModel.create(raw);
  }

  async updateStudentPaymentBalance(
    studentId: number,
    studentPaymentBalance: StudentPaymentBalance,
  ) {
    const raw = StudentPaymentBalanceMap.toPersistence(studentPaymentBalance);
    await this.studentPaymentBalanceModel.update(raw, { where: { studentId } });
  }

  async getStudentPaymentBalanceByStudentId(
    id: number,
  ): Promise<StudentPaymentBalance> {
    const instance = await this.studentPaymentBalanceModel.findOne({
      where: { studentId: id },
    });
    return StudentPaymentBalanceMap.toDomain(instance);
  }

  async getStudentPaymentBalances(): Promise<StudentPaymentBalance[]> {
    const instances = await this.studentPaymentBalanceModel.findAll({
      include: [
        {
          model: StudentModel,
          as: 'student',
        },
      ],
    });
    return instances.map((e) => StudentPaymentBalanceMap.toDomain(e));
  }
}
