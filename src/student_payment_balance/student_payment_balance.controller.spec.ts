import { Test, TestingModule } from '@nestjs/testing';
import { StudentPaymentBalanceController } from './student_payment_balance.controller';

describe('StudentPaymentBalanceController', () => {
  let controller: StudentPaymentBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentPaymentBalanceController],
    }).compile();

    controller = module.get<StudentPaymentBalanceController>(StudentPaymentBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
