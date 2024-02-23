import { Test, TestingModule } from '@nestjs/testing';
import { StudentFamilyService } from './student_family.service';

describe('StudentFamilyService', () => {
  let service: StudentFamilyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentFamilyService],
    }).compile();

    service = module.get<StudentFamilyService>(StudentFamilyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
