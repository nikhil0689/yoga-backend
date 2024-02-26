import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentPaymentRepository } from './student_payment.repository';
import {
  AddStudentPaymentProps,
  StudentPayment,
  UpdateStudentPaymentProps,
} from './student_payment.entity';
import { StudentService } from 'src/student/student.service';
import { StudentFamilyService } from 'src/student_family/student_family.service';

@Injectable()
export class StudentPaymentService {
  constructor(
    private readonly studentService: StudentService,
    private readonly studentFamilyService: StudentFamilyService,
    private readonly studentPaymentRepo: StudentPaymentRepository,
  ) {}

  /**
   * Add a payment for the student
   * @param addStudentPaymentProps
   * @returns Student payment details
   */
  async addPayment(
    addStudentPaymentProps: AddStudentPaymentProps,
  ): Promise<StudentPayment> {
    const { studentId, payment, date } = addStudentPaymentProps;

    // Get student family details. In a way verifying if student exists.
    const { family } = await this.studentService.getStudentById(studentId);

    // Calculate the new balance by subtracting the payment.
    const newfamilyBalance = family.props.balance - payment;

    // Create a student payment object.
    const studentPayment = StudentPayment.create({
      studentId,
      payment,
      date,
    });
    const paymentCreated =
      await this.studentPaymentRepo.addStudentPayment(studentPayment);

    // Update the family table
    const updatedFamily = family.patch({
      balance: newfamilyBalance,
    });

    await this.studentFamilyService.updateFamily(family.id, updatedFamily);

    return this.getStudentPaymentById(paymentCreated.id);
  }

  /**
   * Update a student's payment by payment id
   * @param id paymentId
   * @param updateStudentPaymentProps
   * @returns void
   */
  async updateStudentPaymentById(
    id: number,
    updateStudentPaymentProps: UpdateStudentPaymentProps,
  ) {
    const { studentId, payment, date } = updateStudentPaymentProps;

    // Get student's payment details
    const studentPayment = await this.getStudentPaymentById(id);

    const oldPayment = studentPayment.props.payment;

    // Update student payment object with the props values
    const updatedStudentPayment = studentPayment.patch({
      studentId,
      payment,
      date,
    });

    // Update student payment
    await this.studentPaymentRepo.updateStudentPaymentById(
      id,
      updatedStudentPayment,
    );

    // Update balance only if the new payment is different than the old payment value
    if (oldPayment !== payment) {
      const { family } = await this.studentService.getStudentById(studentId);

      // Add old payment back to the balance and subtract the new payment from balance
      const newfamilyBalance = family.props.balance + oldPayment - payment;

      // Update the family balance
      const updatedFamily = family.patch({
        balance: newfamilyBalance,
      });

      await this.studentFamilyService.updateFamily(family.id, updatedFamily);
    }

    return this.getStudentPaymentById(id);
  }

  /**
   * Get student payment by payment id
   * @param id
   * @returns Student's payment
   */
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

  /**
   * Get all students payments
   * @returns Students payments
   */
  async getStudentPayments(): Promise<StudentPayment[]> {
    return await this.studentPaymentRepo.getStudentPayments();
  }

  /**
   * Delete a student payment by payment id
   * @param id payment id
   */
  async deleteStudentPaymentById(id: number): Promise<void> {
    const { studentId, payment } = await this.getStudentPaymentById(id);

    const { family } = await this.studentService.getStudentById(studentId);

    // Add the payment amount back to the balance
    const newfamilyBalance = family.props.balance + payment;

    // Update the family balance
    const updatedFamily = family.patch({
      balance: newfamilyBalance,
    });

    await this.studentFamilyService.updateFamily(family.id, updatedFamily);

    // Delete the student payment record.
    await this.studentPaymentRepo.deleteStudentPaymentById(id);
  }
}
