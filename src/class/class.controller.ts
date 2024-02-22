import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClassService } from './class.service';
import {
  ClassCreateDTO,
  ClassResponseDTO,
  ClassStudentResponseDTO,
  ClassUpdateDTO,
} from './dtos/class.dto';
import { ClassMap } from './class.datamapper';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_CLASS } from './class.constants';
import { ClassStudentMap } from 'src/class_student/class_student.datamapper';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @YogaApi({
    tag: API_TAG_CLASS,
    summary: 'Get Classes',
    description: 'Get Classes',
    apiId: 'yoga-8',
  })
  @Get()
  async getClassStudentRecords(): Promise<ClassStudentResponseDTO[]> {
    const classes = await this.classService.getClassStudentRecords();
    return classes.map((e) => ClassStudentMap.toClassStudentDTO(e));
  }

  @YogaApi({
    tag: API_TAG_CLASS,
    summary: 'Get Student records by Class Id',
    description: 'Get Student records by Class Id',
    apiId: 'yoga-12',
  })
  @Get(':id')
  async getStudentRecordsByClassId(
    @Param('id') id: number,
  ): Promise<ClassStudentResponseDTO[]> {
    const studentRecords =
      await this.classService.getClassStudentRecordsByClassId(id);
    return studentRecords.map((e) => ClassStudentMap.toClassStudentDTO(e));
  }

  @YogaApi({
    tag: API_TAG_CLASS,
    summary: 'Create a Class',
    description: 'Create a class',
    apiId: 'yoga-9',
  })
  @Post()
  async createClass(
    @Body() classCreateDTO: ClassCreateDTO,
  ): Promise<ClassResponseDTO> {
    const _class = await this.classService.createClass(classCreateDTO);
    return ClassMap.toClassDTO(_class);
  }

  @YogaApi({
    tag: API_TAG_CLASS,
    summary: 'Update a Class',
    description: 'Update a class',
    apiId: 'yoga-10',
  })
  @Patch(':id')
  async updateClass(
    @Param('id') id: number,
    @Body() classUpdateDTO: ClassUpdateDTO,
  ): Promise<ClassResponseDTO> {
    const _class = await this.classService.updateClass(id, classUpdateDTO);
    return ClassMap.toClassDTO(_class);
  }

  @YogaApi({
    tag: API_TAG_CLASS,
    summary: 'Delete a Class',
    description: 'Delete a class',
    apiId: 'yoga-11',
  })
  @Delete(':id')
  async deleteClassById(@Param('id') id: number): Promise<boolean> {
    await this.classService.deleteClassById(id);
    return true;
  }
}
