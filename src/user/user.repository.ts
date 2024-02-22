import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { UserMap } from './user.datamapper';
import { User, UserProps } from './user.entity';
import { Op } from 'sequelize';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async getUserById(id: number): Promise<User> {
    const modelInstance = await this.userModel.findOne({
      where: {
        id,
      },
    });
    return UserMap.toDomain(modelInstance);
  }

  async getUsers(): Promise<User[]> {
    const modelInstances = await this.userModel.findAll();
    return modelInstances.map((e) => UserMap.toDomain(e));
  }

  async getUser(props: UserProps): Promise<User> {
    const { name, phone, email } = props;
    const conditions = [];

    if (name) {
      conditions.push({ name });
    }
    if (phone) {
      conditions.push({ phone });
    }
    if (email) {
      conditions.push({ email });
    }

    const condition = {
      where: {
        [Op.or]: conditions,
      },
    };

    const modelInstance = await this.userModel.findOne(condition);
    return UserMap.toDomain(modelInstance);
  }

  async getUserByPhone(phone: string): Promise<User> {
    const modelInstance = await this.userModel.findOne({
      where: {
        phone,
      },
    });
    return UserMap.toDomain(modelInstance);
  }

  async getUserByName(name: string): Promise<User> {
    const modelInstance = await this.userModel.findOne({
      where: {
        name,
      },
    });
    return UserMap.toDomain(modelInstance);
  }

  async createUser(user: User): Promise<User> {
    const raw = UserMap.toPersistence(user);
    const userCreated = await this.userModel.create(raw);
    return UserMap.toDomain(userCreated);
  }

  async deleteUserById(id: number): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }

  async updateUserById(id: number, updatedUserEntity: User): Promise<void> {
    const raw = UserMap.toPersistence(updatedUserEntity);
    await this.userModel.update(raw, { where: { id } });
  }
}
