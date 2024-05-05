import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  MonthlyPaymentProps,
  StudentPayment,
  StudentPaymentsWithCount,
} from './student_payment.entity';
import { StudentPaymentModel } from './student_payment.model';
import { StudentPaymentMap } from './student_payment.datamapper';
import { StudentModel } from 'src/student/student.model';
import { PaginationParams } from 'src/common/pagination.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class StudentPaymentRepository {
  constructor(
    @InjectModel(StudentPaymentModel)
    private studentPaymentModel: typeof StudentPaymentModel,
  ) {}

  /**
   * Add a student payment
   * @param studentPayment
   * @returns Student payment details
   */
  async addStudentPayment(
    studentPayment: StudentPayment,
  ): Promise<StudentPayment> {
    const raw = StudentPaymentMap.toPersistence(studentPayment);
    const instance = await this.studentPaymentModel.create(raw);
    return StudentPaymentMap.toDomain(instance);
  }

  /**
   * Update student payment by payment id
   * @param id
   * @param updatedStudentPayment
   */
  async updateStudentPaymentById(
    id: number,
    updatedStudentPayment: StudentPayment,
  ): Promise<void> {
    const raw = StudentPaymentMap.toPersistence(updatedStudentPayment);
    await this.studentPaymentModel.update(raw, { where: { id } });
  }

  /**
   * Get student payment by payment id
   * @param id
   * @returns Student's payment
   */
  async getStudentPaymentById(id: number): Promise<StudentPayment> {
    const instance = await this.studentPaymentModel.findOne({
      include: [
        {
          model: StudentModel,
          as: 'student',
        },
      ],
      where: {
        id,
      },
    });
    return StudentPaymentMap.toDomain(instance);
  }

  /**
   * Get all students payments
   * @returns Students payments
   */
  async getStudentPayments(
    paginationParams: PaginationParams,
  ): Promise<StudentPaymentsWithCount> {
    const { offset, limit } = paginationParams;
    const payments = await this.studentPaymentModel.findAndCountAll({
      limit: limit,
      offset: offset,
      distinct: true,
      order: [['id', 'DESC']],
      include: [
        {
          model: StudentModel,
          as: 'student',
        },
      ],
    });

    const paginatedResults = {
      results: payments.rows.map((e) => StudentPaymentMap.toDomain(e)),
      count: payments.count,
    };

    return paginatedResults;
  }

  async getStudentPaymentsTotal(): Promise<number> {
    return await this.studentPaymentModel.sum('payment');
  }

  /**
   * Delete student payment by id
   * @param id
   */
  async deleteStudentPaymentById(id: number) {
    await this.studentPaymentModel.destroy({
      where: {
        id,
      },
    });
  }

  async getMonthlyPaymentsStats(year: number): Promise<MonthlyPaymentProps[]> {
    const monthlyPayments = await this.studentPaymentModel.findAll({
      attributes: [
        [Sequelize.fn('YEAR', Sequelize.col('date')), 'year'],
        [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('payment')), 'payments'],
      ],
      where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), year),
      group: [
        Sequelize.fn('YEAR', Sequelize.col('date')),
        Sequelize.fn('MONTH', Sequelize.col('date')),
      ],
      order: [
        Sequelize.fn('YEAR', Sequelize.col('date')),
        Sequelize.fn('MONTH', Sequelize.col('date')),
      ],
    });

    return StudentPaymentMap.toMonthlyPaymentsInYearDomain(monthlyPayments);
  }
}
