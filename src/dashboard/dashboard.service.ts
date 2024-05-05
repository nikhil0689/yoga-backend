import { Injectable } from '@nestjs/common';
import { ClassService } from 'src/class/class.service';
import { StudentService } from 'src/student/student.service';
import { StudentFamilyService } from 'src/student_family/student_family.service';
import { StudentPaymentService } from 'src/student_payment/student_payment.service';
import { DashboardStats } from './dashboard.entity';
import { MonthlyClassProps } from 'src/class/class.entity';
import { MonthlyPaymentProps } from 'src/student_payment/student_payment.entity';

@Injectable()
export class DashboardService {
  constructor(
    private readonly classService: ClassService,
    private readonly studentPaymentService: StudentPaymentService,
    private readonly studentService: StudentService,
    private readonly studentFamilyService: StudentFamilyService,
  ) {}

  async getStats(): Promise<DashboardStats> {
    const [studentsCount, classesCount, payments, balance] = await Promise.all([
      this.studentService.getStudentsCount(),
      this.classService.getClassesCount(),
      this.studentPaymentService.getStudentPaymentsTotal(),
      this.studentFamilyService.getTotalBalance(),
    ]);

    const stats = DashboardStats.create({
      students: studentsCount,
      classes: classesCount,
      payments,
      balance,
    });

    return stats;
  }

  async getMonthlyClassesStats(year: number): Promise<MonthlyClassProps[]> {
    return await this.classService.getMonthlyClassesStats(year);
  }

  async getMonthlyPaymentsStats(year: number): Promise<MonthlyPaymentProps[]> {
    return await this.studentPaymentService.getMonthlyPaymentsStats(year);
  }
}
