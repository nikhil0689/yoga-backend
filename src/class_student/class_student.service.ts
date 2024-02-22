import { Injectable } from '@nestjs/common';
import { ClassStudent } from './class_student.entity';
import { ClassStudentRepository } from './class_student.repository';

@Injectable()
export class ClassStudentService {
  constructor(private readonly classStudentRepo: ClassStudentRepository) {}

  async createClassStudentRecords(
    classStudents: ClassStudent[],
  ): Promise<void> {
    await this.classStudentRepo.createClassStudentRecords(classStudents);
  }

  async getClassStudentRecords(): Promise<ClassStudent[]> {
    return await this.classStudentRepo.getClassStudentRecords();
  }

  async getClassStudentRecordsById(id: number): Promise<ClassStudent[]> {
    return await this.classStudentRepo.getClassStudentRecordsById(id);
  }

  async deleteByClassId(id: number): Promise<void> {
    await this.classStudentRepo.deleteByClassId(id);
  }

  async getTotalFeeForStudentById(studentId: number): Promise<number> {
    return await this.classStudentRepo.getTotalFeeForStudentById(studentId);
  }
}
