import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentFamilyRepository } from './student_family.repository';
import { Student } from 'src/student/student.entity';
import { StudentFamily } from './student_family.entity';

@Injectable()
export class StudentFamilyService {
  constructor(private readonly studentFamilyRepo: StudentFamilyRepository) {}

  async getStudentFamilyByName(familyName: string): Promise<StudentFamily> {
    const family =
      await this.studentFamilyRepo.getStudentFamilyByName(familyName);
    if (!family) {
      throw new HttpException('Student Family not found', HttpStatus.NOT_FOUND);
    }
    return family;
  }

  async getFamilies(): Promise<StudentFamily[]> {
    return await this.studentFamilyRepo.getFamilies();
  }

  async createFamily(student: Student): Promise<StudentFamily> {
    const family = StudentFamily.create({
      familyName: student.name,
      ownerId: student.id,
    });
    return await this.studentFamilyRepo.createFamily(family);
  }
}
