import { Controller, Get } from '@nestjs/common';
import { StudentFamilyService } from './student_family.service';
import { StudentFamilyResponseDTO } from './dtos/student_family.dto';
import { StudentFamilyMap } from './student_family.datamapper';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_FAMILY } from './student_family.constants';

@Controller('families')
export class StudentFamilyController {
  constructor(private readonly studentFamilyService: StudentFamilyService) {}

  @YogaApi({
    tag: API_TAG_FAMILY,
    summary: 'Get families',
    description: 'Get all families',
    apiId: 'yoga-7',
  })
  @Get()
  async getFamilies(): Promise<StudentFamilyResponseDTO[]> {
    const students = await this.studentFamilyService.getFamilies();
    return students.map((e) => StudentFamilyMap.toStudentFamilyDTO(e));
  }
}
