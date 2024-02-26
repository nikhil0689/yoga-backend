import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import {
  CreateStudentProps,
  UpdateStudentProps,
  Student,
} from './student.entity';
import { StudentFamilyService } from 'src/student_family/student_family.service';
import { valueExists } from 'src/utils';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly studentFamilyService: StudentFamilyService,
  ) {}

  /**
   * Get students by id
   * @param id
   * @returns Student
   */
  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentRepo.getStudentById(id);
    if (!student) {
      throw new HttpException(`Student ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return student;
  }

  /**
   * Verify if student id exists. If not found, throws error
   * @param studentId
   */
  async verifyStudentId(studentId: number): Promise<void> {
    const studentExists = await this.studentRepo.verifyStudentId(studentId);
    if (!studentExists) {
      throw new HttpException(
        `Student ${studentId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * Get Students
   * @returns Students
   */
  async getStudents(): Promise<Student[]> {
    return await this.studentRepo.getStudents();
  }

  /**
   * Get student data by phone number
   * @param phone
   * @returns Student
   */
  async getStudentByPhone(phone: string): Promise<Student> {
    const student = await this.studentRepo.getStudentByPhone(phone);
    if (!student) {
      throw new HttpException(
        `Student ${phone} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return student;
  }

  /**
   * Create a student
   * @param createStudentProps
   * @returns student
   */
  async createStudent(
    createStudentProps: CreateStudentProps,
  ): Promise<Student> {
    const { name, phone, email, address, familyId } = createStudentProps;

    // Verify if student by name or by phone or by email already exists.
    const studentExists = await this.studentRepo.getStudentCount({
      name,
      phone,
      email,
    });
    if (studentExists) {
      throw new HttpException(`Student already exists`, HttpStatus.BAD_REQUEST);
    }

    // If family id exists, then student is part of a family.
    let studentFamily;
    if (valueExists(familyId)) {
      studentFamily =
        await this.studentFamilyService.getStudentFamilyById(familyId);
    }

    const newStudent = Student.create({
      name,
      phone,
      email,
      address,
      familyId: studentFamily?.id,
    });
    const createdStudent = await this.studentRepo.createStudent(newStudent);

    // If familyid is not present in the input, consider the student as the owner of the new family.
    if (!valueExists(familyId)) {
      studentFamily =
        await this.studentFamilyService.createFamily(createdStudent);

      // Update student table with the newly created family id.
      await this.updateStudentById(createdStudent.id, {
        familyId: studentFamily.id,
      });
    }

    // return the updated student object from the student table
    return await this.getStudentById(createdStudent.id);
  }

  /**
   * Delete a student by id
   * @param studentId
   * @returns boolean
   */
  async deleteStudentById(studentId: number): Promise<boolean> {
    // Verify if student id exists.
    const { id, family } = await this.getStudentById(studentId);
    const familyOwnerId: number = family.ownerId;

    if (id === familyOwnerId) {
      throw new HttpException(
        `Family owner cannot be deleted.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Delete the student record from the student table.
    return await this.studentRepo.deleteStudentById(id);
  }

  /**
   * Update student
   * @param id studentId
   * @param props studentProps
   * @returns Student
   */
  async updateStudentById(
    id: number,
    props: UpdateStudentProps,
  ): Promise<Student> {
    // Get student details from the student id.
    const student = await this.getStudentById(id);

    const { name, phone, email, address, familyId } = props;

    // Update the student object.
    const updatedStudentEntity = student.patch({
      name,
      phone,
      email,
      address,
      familyId,
    });

    // Update student by student id and the student props.
    await this.studentRepo.updateStudentById(id, updatedStudentEntity);

    // Return the updated student object.
    return await this.getStudentById(id);
  }
}
