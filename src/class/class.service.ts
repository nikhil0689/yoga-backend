import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Class,
  ClassStudentProps,
  ClassStudentPropsWithCount,
  CreateClassProps,
  UpdateClassProps,
} from './class.entity';
import { ClassRepository } from './class.repository';
import { ClassStudent } from 'src/class_student/class_student.entity';
import { ClassStudentService } from 'src/class_student/class_student.service';
import { StudentService } from 'src/student/student.service';
import { StudentFamilyService } from 'src/student_family/student_family.service';
import { StudentFamily } from 'src/student_family/student_family.entity';
import { PaginationParams } from 'src/common/pagination.entity';

@Injectable()
export class ClassService {
  constructor(
    private readonly classRepo: ClassRepository,
    private readonly classStudentService: ClassStudentService,
    private readonly studentService: StudentService,
    private readonly studentFamilyService: StudentFamilyService,
  ) {}

  /**
   * Get class by classId
   * @param id
   * @returns Class
   */
  async getClassById(id: number): Promise<Class> {
    const classDetails = await this.classRepo.getClassById(id);
    if (!classDetails) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }
    return classDetails;
  }

  /**
   * Only used in the service layer
   * Get Class Student relationship records
   * @param id classId
   * @returns
   */
  async getClassStudentRecordsByClassId(id: number): Promise<ClassStudent[]> {
    // verify if class id exists.
    await this.getClassById(id);

    // Get class student details for the class id.
    const classStudentDetails =
      await this.classStudentService.getClassStudentRecordsById(id);

    return classStudentDetails;
  }

  /**
   * Used in controller
   * @param id class id
   * @returns Classes with student records
   */
  async getClassStudentsByClassId(id: number): Promise<ClassStudentProps> {
    // verify if class id exists.
    await this.getClassById(id);
    return await this.classRepo.getClassStudentsById(id);
  }

  /**
   * Get all class student records
   * @returns Class student records
   */
  async getClassStudentRecords(
    paginationParams: PaginationParams,
  ): Promise<ClassStudentPropsWithCount> {
    return await this.classRepo.getClasses(paginationParams);
  }

  /**
   * Create a Class
   * Update Student class relationship
   * Update student fee in the family table
   * @param createClassProps
   * @returns
   */
  async createClass(createClassProps: CreateClassProps): Promise<Class> {
    const { date, time, studentFee } = createClassProps;

    if (!studentFee || studentFee.length === 0) {
      throw new HttpException(
        'Student details are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verify if student exists
    for (const data of studentFee) {
      await this.studentService.verifyStudentId(data.studentId);
    }

    // Create a class
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

    // For each student create class student records.
    await this.classStudentService.createClassStudentRecords(classStudents);

    // For each student update their balance in the family table.
    for (const data of studentFee) {
      const { family } = await this.studentService.getStudentById(
        data.studentId,
      );
      const fee = data.fee;
      // Add current balance with the new fee for the class.
      const newBalance = family.props.balance + fee;

      // Update the family object
      const updatedStudentFamily: StudentFamily = family.patch({
        balance: newBalance,
      });

      await this.studentFamilyService.updateFamily(
        family.id,
        updatedStudentFamily,
      );
    }

    return classCreated;
  }

  /**
   * Update a class
   * @param id classId
   * @param updateClassProps
   * @returns Class
   */
  async updateClass(id, updateClassProps: UpdateClassProps): Promise<Class> {
    const _class = await this.getClassById(id);
    const { date, time, studentFee } = updateClassProps;

    // If date or time is present in the input, then update the class object.
    if (date || time) {
      const updateClassEntity = _class.patch({
        date,
        time,
      });

      // Update the class by id
      await this.classRepo.updateClassById(id, updateClassEntity);
    }

    // If student fee details are present, then update them accordingly.
    if (studentFee && studentFee.length > 0) {
      // Verify if student exists
      for (const data of studentFee) {
        await this.studentService.verifyStudentId(data.studentId);
      }

      // Get current class student relationships
      const currentClassStudents =
        await this.getClassStudentRecordsByClassId(id);

      // For each of the record, update the balance in the family table to the previous state.
      for (const data of currentClassStudents) {
        // Get family details of the student.
        const { family } = await this.studentService.getStudentById(
          data.studentId,
        );
        const fee = data.fee;

        // Subtract the fee from the  current balance;
        const newBalance = family.props.balance - fee;

        // Update the family object
        const updatedStudentFamily: StudentFamily = family.patch({
          balance: newBalance,
        });

        await this.studentFamilyService.updateFamily(
          family.id,
          updatedStudentFamily,
        );
      }

      // Delete class student relationship
      await this.classStudentService.deleteByClassId(_class.id);

      // Create new class student relationship based on the update props.
      const classStudents = studentFee.map((e) =>
        ClassStudent.create({
          classId: _class.id,
          studentId: e.studentId,
          fee: e.fee,
        }),
      );

      await this.classStudentService.createClassStudentRecords(classStudents);

      // For each student update their balance in the family table.
      for (const data of studentFee) {
        const { family } = await this.studentService.getStudentById(
          data.studentId,
        );
        const fee = data.fee;
        // Add current balance with the new fee for the class.
        const newBalance = family.props.balance + fee;

        // Update the family object
        const updatedStudentFamily: StudentFamily = family.patch({
          balance: newBalance,
        });

        await this.studentFamilyService.updateFamily(
          family.id,
          updatedStudentFamily,
        );
      }
    }

    return _class;
  }

  /**
   * Delete a class by id
   * delete student class relationship
   * update family balance
   * @param id
   */
  async deleteClassById(id: number): Promise<void> {
    const classStudents = await this.getClassStudentRecordsByClassId(id);

    // For each of the record, update the balance in the family table to the previous state.
    for (const data of classStudents) {
      // Get family details of the student.
      const { family } = await this.studentService.getStudentById(
        data.studentId,
      );
      const fee = data.fee;

      // Subtract the fee from the  current balance;
      const newBalance = family.props.balance - fee;

      // Update the family object
      const updatedStudentFamily: StudentFamily = family.patch({
        balance: newBalance,
      });

      await this.studentFamilyService.updateFamily(
        family.id,
        updatedStudentFamily,
      );
    }

    // Delete class record.
    await this.classRepo.deleteClassById(id);
  }

  async getClassesCount(): Promise<number> {
    return this.classRepo.getClassesCount();
  }
}
