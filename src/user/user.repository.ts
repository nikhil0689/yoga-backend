import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { User } from './user.entity';
import { UserMap } from './user.datamapper';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  /**
   * Get user by id
   * @param id User Id
   * @returns User
   */
  async getUserById(id: string): Promise<User> {
    const modelInstance = await this.userModel.findOne({
      where: {
        uniqueId: id,
      },
    });
    return UserMap.toDomain(modelInstance);
  }
}
