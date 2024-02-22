import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentPaymentRepository } from './student_payment.repository';
import {
  AddStudentPaymentProps,
  StudentPayment,
  UpdateStudentPaymentProps,
} from './student_payment.entity';
import { StudentPaymentBalanceService } from 'src/student_payment_balance/student_payment_balance.service';

@Injectable()
export class StudentPaymentService {
  constructor(
    private readonly studentPaymentRepo: StudentPaymentRepository,
    private readonly studentPaymentBalanceService: StudentPaymentBalanceService,
  ) {}

  async addPayment(
    addStudentPaymentProps: AddStudentPaymentProps,
  ): Promise<StudentPayment> {
    const { studentId, payment, date } = addStudentPaymentProps;
    const studentPayment = StudentPayment.create({
      studentId,
      payment,
      date,
    });
    const paymentCreated =
      await this.studentPaymentRepo.addStudentPayment(studentPayment);

    const studentPaymentBalance =
      await this.studentPaymentBalanceService.getStudentPaymentBalanceByStudentId(
        studentId,
      );

    const newBalance = studentPaymentBalance.props.balance - payment;

    const newStudentPaymentBalance = studentPaymentBalance.patch({
      balance: newBalance,
    });

    await this.studentPaymentBalanceService.updateStudentPaymentBalance(
      studentId,
      newStudentPaymentBalance,
    );

    return this.getStudentPaymentById(paymentCreated.id);
  }

  async updateStudentPaymentById(
    id: number,
    updateStudentPaymentProps: UpdateStudentPaymentProps,
  ) {
    const { studentId, payment, date } = updateStudentPaymentProps;
    const studentPayment = await this.getStudentPaymentById(id);

    const oldPayment = studentPayment.props.payment;

    const updatedStudentPayment = studentPayment.patch({
      studentId,
      payment,
      date,
    });

    await this.studentPaymentRepo.updateStudentPaymentById(
      id,
      updatedStudentPayment,
    );

    if (oldPayment !== payment) {
      const studentPaymentBalance =
        await this.studentPaymentBalanceService.getStudentPaymentBalanceByStudentId(
          studentId,
        );

      const currentBalance = studentPaymentBalance.props.balance;

      const newBalance = currentBalance - oldPayment + payment;

      const newStudentPaymentBalance = studentPaymentBalance.patch({
        balance: newBalance,
      });

      await this.studentPaymentBalanceService.updateStudentPaymentBalance(
        studentId,
        newStudentPaymentBalance,
      );
    }

    return this.getStudentPaymentById(id);
  }

  async getStudentPaymentById(id: number): Promise<StudentPayment> {
    const studentPayment =
      await this.studentPaymentRepo.getStudentPaymentById(id);
    if (!studentPayment) {
      throw new HttpException(
        'Student payment not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return studentPayment;
  }

  async getStudentPayments(): Promise<StudentPayment[]> {
    return await this.studentPaymentRepo.getStudentPayments();
  }

  async deleteStudentPaymentById(id: number): Promise<void> {
    const { studentId, payment } = await this.getStudentPaymentById(id);

    const studentPaymentBalance =
      await this.studentPaymentBalanceService.getStudentPaymentBalanceByStudentId(
        studentId,
      );

    const newBalance = studentPaymentBalance.balance + payment;

    const newStudentPaymentBalance = studentPaymentBalance.patch({
      balance: newBalance,
    });

    await this.studentPaymentBalanceService.updateStudentPaymentBalance(
      studentId,
      newStudentPaymentBalance,
    );

    await this.studentPaymentRepo.deleteStudentPaymentById(id);
  }
}
