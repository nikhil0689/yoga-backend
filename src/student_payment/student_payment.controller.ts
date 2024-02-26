import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentPaymentService } from './student_payment.service';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_PAYMENT } from './payment.constants';
import {
  CreatePaymentDTO,
  StudentPaymentResponseDTO,
  UpdateStudentPaymentDTO,
} from './dtos/student_payment.dto';
import { StudentPaymentMap } from './student_payment.datamapper';

@Controller('payments')
export class StudentPaymentController {
  constructor(private readonly studentPaymentService: StudentPaymentService) {}

  @YogaApi({
    tag: API_TAG_PAYMENT,
    summary: 'Add a Payment',
    description: 'Add a Student Payment',
    apiId: 'yoga-1',
  })
  @Post()
  async addPayment(
    @Body() createPaymentDTO: CreatePaymentDTO,
  ): Promise<StudentPaymentResponseDTO> {
    const payment =
      await this.studentPaymentService.addPayment(createPaymentDTO);
    return StudentPaymentMap.toStudentPaymentDTO(payment);
  }

  @YogaApi({
    tag: API_TAG_PAYMENT,
    summary: 'Get a Student Payment',
    description: 'Get a Student Payment',
    apiId: 'yoga-1',
  })
  @Get()
  async getStudentPayments(): Promise<StudentPaymentResponseDTO[]> {
    const data = await this.studentPaymentService.getStudentPayments();
    return data.map((e) => StudentPaymentMap.toStudentPaymentDTO(e));
  }

  @YogaApi({
    tag: API_TAG_PAYMENT,
    summary: 'Add a Payment',
    description: 'Add a Student Payment',
    apiId: 'yoga-1',
  })
  @Get(':id')
  async getStudentPaymentById(
    @Param('id') id: number,
  ): Promise<StudentPaymentResponseDTO> {
    const data = await this.studentPaymentService.getStudentPaymentById(id);
    return StudentPaymentMap.toStudentPaymentDTO(data);
  }

  @YogaApi({
    tag: API_TAG_PAYMENT,
    summary: 'Delete a Payment',
    description: 'Delete a Student Payment',
    apiId: 'yoga-1',
  })
  @Delete(':id')
  async deleteStudentPaymentById(@Param('id') id: number): Promise<boolean> {
    const data = await this.studentPaymentService.deleteStudentPaymentById(id);
    return true;
  }

  @YogaApi({
    tag: API_TAG_PAYMENT,
    summary: 'Update a Payment by payment id',
    description: 'Update a Student Payment',
    apiId: 'yoga-1',
  })
  @Patch(':id')
  async updateStudentPaymentById(
    @Param('id') id: number,
    @Body() updateStudentPaymentDTO: UpdateStudentPaymentDTO,
  ): Promise<StudentPaymentResponseDTO> {
    const data = await this.studentPaymentService.updateStudentPaymentById(
      id,
      updateStudentPaymentDTO,
    );
    return StudentPaymentMap.toStudentPaymentDTO(data);
  }
}
