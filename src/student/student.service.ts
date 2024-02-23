import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import {
  CreateStudentProps,
  UpdateStudentProps,
  Student,
} from './student.entity';
import { StudentFamilyService } from 'src/student_family/student_family.service';
import { StudentUpdateDTO } from './dtos/student.dto';
import { StudentPaymentBalanceService } from 'src/student_payment_balance/student_payment_balance.service';
import { StudentPaymentBalance } from 'src/student_payment_balance/student_payment_balance.entity';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly studentFamilyService: StudentFamilyService,
    private readonly studentPaymentBalanceService: StudentPaymentBalanceService,
  ) {}

  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentRepo.getStudentById(id);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  async getStudents(): Promise<Student[]> {
    return await this.studentRepo.getStudents();
  }

  async getStudentByPhone(phone: string): Promise<Student> {
    const student = await this.studentRepo.getStudentByPhone(phone);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  async getStudentByName(name: string): Promise<Student> {
    const student = await this.studentRepo.getStudentByName(name);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  async createStudent(
    createStudentProps: CreateStudentProps,
  ): Promise<Student> {
    const { name, phone, email, address, family } = createStudentProps;
    const studentExists = await this.studentRepo.getStudent({
      name,
      phone,
      email,
    });
    if (studentExists) {
      throw new HttpException(`Student already exists`, HttpStatus.BAD_REQUEST);
    }

    let studentFamily;
    if (family) {
      studentFamily =
        await this.studentFamilyService.getStudentFamilyByName(family);
    }

    const newStudent = Student.create({
      name,
      phone,
      email,
      address,
      familyId: studentFamily?.id,
    });
    const createdStudent = await this.studentRepo.createStudent(newStudent);

    if (!family) {
      studentFamily =
        await this.studentFamilyService.createFamily(createdStudent);
      await this.updateStudentById(createdStudent.id, {
        familyId: studentFamily.id,
      });
    }
    const student = await this.getStudentById(createdStudent.id);
    // Create an entry in the student payment balance table as well

    const studentPaymentBalance = StudentPaymentBalance.create({
      studentId: student.id,
      balance: 0,
    });

    await this.studentPaymentBalanceService.addStudentPaymentBalance(
      studentPaymentBalance,
    );

    return student;
  }

  async deleteStudentById(id: number): Promise<void> {
    await this.getStudentById(id);
    return await this.studentRepo.deleteStudentById(id);
  }

  async updateStudentById(
    id: number,
    props: UpdateStudentProps,
  ): Promise<Student> {
    const student = await this.getStudentById(id);
    const { name, phone, email, address, familyId } = props;
    const updatedStudentEntity = student.patch({
      name,
      phone,
      email,
      address,
      familyId,
    });

    await this.studentRepo.updateStudentById(id, updatedStudentEntity);
    return await this.getStudentById(id);
  }
}
