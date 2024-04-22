import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentFamilyRepository } from './student_family.repository';
import { Student } from 'src/student/student.entity';
import { StudentFamily } from './student_family.entity';

@Injectable()
export class StudentFamilyService {
  constructor(private readonly studentFamilyRepo: StudentFamilyRepository) {}

  /**
   * Get student family by Id
   * @param id
   * @returns
   */
  async getStudentFamilyById(id: number): Promise<StudentFamily> {
    const family = await this.studentFamilyRepo.getStudentFamilyById(id);
    if (!family) {
      throw new HttpException('Student Family not found', HttpStatus.NOT_FOUND);
    }
    return family;
  }

  /**
   * Get all families
   * @returns StudentFamily
   */
  async getFamilies(): Promise<StudentFamily[]> {
    return await this.studentFamilyRepo.getFamilies();
  }

  /**
   * Create a family for the new student. Current balance will be 0.
   * @param student
   * @returns StudentFamily
   */
  async createFamily(student: Student): Promise<StudentFamily> {
    const family = StudentFamily.create({
      familyName: student.name,
      ownerId: student.id,
      balance: 0,
    });
    return await this.studentFamilyRepo.createFamily(family);
  }

  /**
   * Update family data with the new balance.
   * @param id
   * @param studentFamily
   */
  async updateFamily(id: number, studentFamily: StudentFamily): Promise<void> {
    await this.studentFamilyRepo.updateFamily(id, studentFamily);
  }

  async getTotalBalance(): Promise<number> {
    return await this.studentFamilyRepo.getTotalBalance();
  }
}
