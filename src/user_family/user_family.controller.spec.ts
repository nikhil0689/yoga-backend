import { Test, TestingModule } from '@nestjs/testing';
import { UserFamilyController } from './user_family.controller';

describe('UserFamilyController', () => {
  let controller: UserFamilyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFamilyController],
    }).compile();

    controller = module.get<UserFamilyController>(UserFamilyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
