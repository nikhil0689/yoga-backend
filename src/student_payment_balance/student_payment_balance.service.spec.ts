import { Test, TestingModule } from '@nestjs/testing';
import { StudentPaymentBalanceService } from './student_payment_balance.service';

describe('StudentPaymentBalanceService', () => {
  let service: StudentPaymentBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentPaymentBalanceService],
    }).compile();

    service = module.get<StudentPaymentBalanceService>(StudentPaymentBalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
