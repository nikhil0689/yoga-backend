import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserFamilyModel } from './user_family.model';
import { UserFamily } from './user_family.entity';
import { UserModel } from 'src/user/user.model';
import { UserFamilyMap } from './user_family.datamapper';

@Injectable()
export class UserFamilyRepository {
  constructor(
    @InjectModel(UserFamilyModel)
    private userFamilyModel: typeof UserFamilyModel,
  ) {}

  async getUserFamilyByName(familyName: string): Promise<UserFamily> {
    const instance = await this.userFamilyModel.findOne({
      where: {
        familyName,
      },
    });
    return UserFamilyMap.toDomain(instance);
  }

  async getFamilies(): Promise<UserFamily[]> {
    const instances = await this.userFamilyModel.findAll({
      include: [{ model: UserModel, as: 'owner' }],
    });
    return instances.map((e) => UserFamilyMap.toDomain(e));
  }

  async createFamily(family: UserFamily): Promise<UserFamily> {
    const raw = UserFamilyMap.toPersistence(family);
    const instance = await this.userFamilyModel.create(raw);
    return UserFamilyMap.toDomain(instance);
  }
}
