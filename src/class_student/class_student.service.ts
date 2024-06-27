import { Injectable } from '@nestjs/common';
import { ClassStudent } from './class_student.entity';
import { ClassStudentRepository } from './class_student.repository';

@Injectable()
export class ClassStudentService {
  constructor(private readonly classStudentRepo: ClassStudentRepository) {}

  /**
   * Create Class student relationship
   * @param classStudents
   */
  async createClassStudentRecords(
    classStudents: ClassStudent[],
  ): Promise<void> {
    await this.classStudentRepo.createClassStudentRecords(classStudents);
  }

  /**
   * Get all class student records.
   * @returns Class Student records
   */
  async getClassStudentRecords(): Promise<ClassStudent[]> {
    return await this.classStudentRepo.getClassStudentRecords();
  }

  /**
   * Get class student records.
   * @param id
   * @returns An array of class students.
   */
  async getClassStudentRecordsById(id: number): Promise<ClassStudent[]> {
    return await this.classStudentRepo.getClassStudentRecordsById(id);
  }

  /**
   * Delete class student relationship by class id
   * @param id
   */
  async deleteByClassId(id: number): Promise<void> {
    await this.classStudentRepo.deleteByClassId(id);
  }

  async getStudentClassCount(studentId: number): Promise<number> {
    return await this.classStudentRepo.getStudentClassCount(studentId);
  }
}
