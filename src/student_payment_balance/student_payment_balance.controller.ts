import { Controller, Get } from '@nestjs/common';
import { StudentPaymentBalanceService } from './student_payment_balance.service';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_BALANCE } from './student_payment_balance.constants';
import { StudentPaymentBalanceResponseDTO } from './dtos/student_payment_balance.dto';
import { StudentPaymentBalanceMap } from './student_payment_balance.datamapper';

@Controller('balances')
export class StudentPaymentBalanceController {
  constructor(
    private readonly studentPaymentBalanceService: StudentPaymentBalanceService,
  ) {}

  @YogaApi({
    tag: API_TAG_BALANCE,
    summary: 'Get student payment balance',
    description: 'Get Student Payment Balance',
    apiId: 'yoga-1',
  })
  @Get()
  async getStudentPaymentBalances(): Promise<
    StudentPaymentBalanceResponseDTO[]
  > {
    const data =
      await this.studentPaymentBalanceService.getStudentPaymentBalances();
    return data.map((e) =>
      StudentPaymentBalanceMap.toStudentPaymentBalanceDTO(e),
    );
  }
}
