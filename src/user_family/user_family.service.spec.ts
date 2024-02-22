import { Test, TestingModule } from '@nestjs/testing';
import { UserFamilyService } from './user_family.service';

describe('UserFamilyService', () => {
  let service: UserFamilyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFamilyService],
    }).compile();

    service = module.get<UserFamilyService>(UserFamilyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
