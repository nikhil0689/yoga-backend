import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentPaymentService } from './student_payment.service';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_PAYMENT } from './payment.constants';
import {
  CreatePaymentDTO,
  PaginatedStudentPaymentResponseDTO,
  StudentPaymentResponseDTO,
  UpdateStudentPaymentDTO,
} from './dtos/student_payment.dto';
import { StudentPaymentMap } from './student_payment.datamapper';
import {
  PaginationParams,
  calculateSizeAndOffset,
} from 'src/common/pagination.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';

@Controller('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
    summary: 'Get Student Payments',
    description: 'Get Student Payments',
    apiId: 'yoga-1',
  })
  @Get()
  async getStudentPayments(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<PaginatedStudentPaymentResponseDTO> {
    const paginationParams: PaginationParams = calculateSizeAndOffset(
      page,
      size,
    );
    const data =
      await this.studentPaymentService.getStudentPayments(paginationParams);
    return StudentPaymentMap.toPaginatedStudentPaymentDTO(data);
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
    await this.studentPaymentService.deleteStudentPaymentById(id);
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
