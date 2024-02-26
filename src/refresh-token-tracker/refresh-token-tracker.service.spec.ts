import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenTrackerService } from './refresh-token-tracker.service';

describe('RefreshTokenTrackerService', () => {
  let service: RefreshTokenTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshTokenTrackerService],
    }).compile();

    service = module.get<RefreshTokenTrackerService>(RefreshTokenTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
