import { Injectable } from '@nestjs/common';
import { StudentPaymentBalance } from './student_payment_balance.entity';
import { StudentPaymentBalanceRepository } from './student_payment_balance.repository';

@Injectable()
export class StudentPaymentBalanceService {
  constructor(
    private readonly studentPaymentBalanceRepo: StudentPaymentBalanceRepository,
  ) {}

  async addStudentPaymentBalance(
    studentPaymentBalance: StudentPaymentBalance,
  ): Promise<void> {
    await this.studentPaymentBalanceRepo.addStudentPaymentBalance(
      studentPaymentBalance,
    );
  }

  async getStudentPaymentBalanceByStudentId(
    studentId: number,
  ): Promise<StudentPaymentBalance> {
    return await this.studentPaymentBalanceRepo.getStudentPaymentBalanceByStudentId(
      studentId,
    );
  }

  async updateStudentPaymentBalance(
    studentId: number,
    studentPaymentBalance: StudentPaymentBalance,
  ): Promise<void> {
    await this.studentPaymentBalanceRepo.updateStudentPaymentBalance(
      studentId,
      studentPaymentBalance,
    );
  }

  async getStudentPaymentBalances(): Promise<StudentPaymentBalance[]> {
    return await this.studentPaymentBalanceRepo.getStudentPaymentBalances();
  }
}
