import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Class, CreateClassProps, UpdateClassProps } from './class.entity';
import { ClassRepository } from './class.repository';
import { ClassStudent } from 'src/class_student/class_student.entity';
import { ClassStudentService } from 'src/class_student/class_student.service';
import { StudentPaymentBalanceService } from 'src/student_payment_balance/student_payment_balance.service';

@Injectable()
export class ClassService {
  constructor(
    private readonly classRepo: ClassRepository,
    private readonly classStudentService: ClassStudentService,
    private readonly studentPaymentBalanceService: StudentPaymentBalanceService,
  ) {}

  async getClassById(id: number): Promise<Class> {
    const classDetails = await this.classRepo.getClassById(id);
    if (!classDetails) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }
    return classDetails;
  }

  async getClassStudentRecordsByClassId(id: number): Promise<ClassStudent[]> {
    await this.getClassById(id);
    const classStudentDetails =
      await this.classStudentService.getClassStudentRecordsById(id);
    return classStudentDetails;
  }

  async getClassStudentRecords(): Promise<ClassStudent[]> {
    return await this.classStudentService.getClassStudentRecords();
  }

  async createClass(createClassProps: CreateClassProps): Promise<Class> {
    const { date, time, studentFee } = createClassProps;
    if (!studentFee || studentFee.length === 0) {
      throw new HttpException(
        'Student details are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const _class = Class.create({
      date,
      time,
    });
    const classCreated = await this.classRepo.createClass(_class);

    const classStudents = studentFee.map((e) =>
      ClassStudent.create({
        classId: classCreated.id,
        studentId: e.studentId,
        fee: e.fee,
      }),
    );

    await this.classStudentService.createClassStudentRecords(classStudents);

    // update student balance table
    await this.studentPaymentBalance(classStudents);

    return classCreated;
  }

  async updateClass(id, updateClassProps: UpdateClassProps): Promise<Class> {
    const _class = await this.getClassById(id);
    const { date, time, studentFee } = updateClassProps;

    if (date || time) {
      const updateClassEntity = _class.patch({
        date,
        time,
      });

      await this.classRepo.updateClassById(id, updateClassEntity);
    }

    if (studentFee && studentFee.length > 0) {
      await this.classStudentService.deleteByClassId(_class.id);

      const classStudents = studentFee.map((e) =>
        ClassStudent.create({
          classId: _class.id,
          studentId: e.studentId,
          fee: e.fee,
        }),
      );

      await this.classStudentService.createClassStudentRecords(classStudents);

      // update student balance table
      await this.studentPaymentBalance(classStudents);
    }

    return _class;
  }

  private async studentPaymentBalance(classStudents: ClassStudent[]) {
    classStudents.forEach(async (e) => {
      // Get total fee from class student table for a student
      const totalFee = await this.classStudentService.getTotalFeeForStudentById(
        e.studentId,
      );

      const studentPaymentBalance =
        await this.studentPaymentBalanceService.getStudentPaymentBalanceByStudentId(
          e.studentId,
        );

      const newStudentPaymentBalance = studentPaymentBalance.patch({
        balance: totalFee,
      });

      await this.studentPaymentBalanceService.updateStudentPaymentBalance(
        e.studentId,
        newStudentPaymentBalance,
      );
    });
  }

  async deleteClassById(id: number): Promise<void> {
    const classStudents = await this.getClassStudentRecordsByClassId(id);
    classStudents.forEach(async (e) => {
      // Get current balance
      const studentPaymentBalance =
        await this.studentPaymentBalanceService.getStudentPaymentBalanceByStudentId(
          e.studentId,
        );

      //Calculate new balance
      const newBalance = studentPaymentBalance.props.balance - e.props.fee;

      const newStudentPaymentBalance = studentPaymentBalance.patch({
        balance: newBalance,
      });

      // Update the new balance for student
      await this.studentPaymentBalanceService.updateStudentPaymentBalance(
        e.studentId,
        newStudentPaymentBalance,
      );
    });

    await this.classRepo.deleteClassById(id);
  }
}
