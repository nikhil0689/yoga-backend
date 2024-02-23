import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentMap } from './student.datamapper';
import {
  StudentCreateDTO,
  StudentResponseDTO,
  StudentUpdateDTO,
} from './dtos/student.dto';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_STUDENT } from './student.constants';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Get Student',
    description: 'Get Student by ID',
    apiId: 'yoga-1',
  })
  @Get(':id')
  async getStudentById(@Param('id') id: number): Promise<StudentResponseDTO> {
    const student = await this.studentService.getStudentById(id);
    return StudentMap.toStudentDTO(student);
  }

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Get Students',
    description: 'Get all Students',
    apiId: 'yoga-2',
  })
  @Get()
  async getStudents(): Promise<StudentResponseDTO[]> {
    const students = await this.studentService.getStudents();
    return students.map((e) => StudentMap.toStudentDTO(e));
  }

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Get Student by phone',
    description: 'Get Student by phone',
    apiId: 'yoga-3',
  })
  @Get('phone/:phone')
  async getStudentByPhone(
    @Param('phone') phone: string,
  ): Promise<StudentResponseDTO> {
    const student = await this.studentService.getStudentByPhone(phone);
    return StudentMap.toStudentDTO(student);
  }

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Create a new Student',
    description: 'Create a new Student',
    apiId: 'yoga-4',
  })
  @Post()
  async createStudent(
    @Body() studentCreateDTO: StudentCreateDTO,
  ): Promise<StudentResponseDTO> {
    const student = await this.studentService.createStudent(studentCreateDTO);
    return StudentMap.toStudentDTO(student);
  }

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Delete Student',
    description: 'Delete a Student',
    apiId: 'yoga-5',
  })
  @Delete(':id')
  async deleteStudent(@Param('id') id: number): Promise<boolean> {
    await this.studentService.deleteStudentById(id);
    return true;
  }

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Update a Student',
    description: 'Update a Student',
    apiId: 'yoga-6',
  })
  @Patch(':id')
  async updateStudent(
    @Param('id') id: number,
    @Body() studentUpdateDTO: StudentUpdateDTO,
  ): Promise<StudentResponseDTO> {
    const student = await this.studentService.updateStudentById(
      id,
      studentUpdateDTO,
    );
    return StudentMap.toStudentDTO(student);
  }
}
