import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  /**
   * Get User by Unique Id
   * @param id User Id
   * @returns User
   */
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
