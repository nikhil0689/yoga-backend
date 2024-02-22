import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserFamilyRepository } from './user_family.repository';
import { User } from 'src/user/user.entity';
import { UserFamily } from './user_family.entity';

@Injectable()
export class UserFamilyService {
  constructor(private readonly userFamilyRepo: UserFamilyRepository) {}

  async getUserFamilyByName(familyName: string): Promise<UserFamily> {
    const family = await this.userFamilyRepo.getUserFamilyByName(familyName);
    if (!family) {
      throw new HttpException('User Family not found', HttpStatus.NOT_FOUND);
    }
    return family;
  }

  async getFamilies(): Promise<UserFamily[]> {
    return await this.userFamilyRepo.getFamilies();
  }

  async createFamily(user: User): Promise<UserFamily> {
    const family = UserFamily.create({
      familyName: user.name,
      ownerId: user.id,
    });
    return await this.userFamilyRepo.createFamily(family);
  }
}
