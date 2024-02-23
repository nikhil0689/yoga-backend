import { Test, TestingModule } from '@nestjs/testing';
import { StudentFamilyController } from './student_family.controller';

describe('StudentFamilyController', () => {
  let controller: StudentFamilyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentFamilyController],
    }).compile();

    controller = module.get<StudentFamilyController>(StudentFamilyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
