import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserProps, UpdateUserProps, User } from './user.entity';
import { UserFamilyService } from 'src/user_family/user_family.service';
import { UserUpdateDTO } from './dtos/user.dto';
import { StudentPaymentBalanceService } from 'src/student_payment_balance/student_payment_balance.service';
import { StudentPaymentBalance } from 'src/student_payment_balance/student_payment_balance.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userFamilyService: UserFamilyService,
    private readonly studentPaymentBalanceService: StudentPaymentBalanceService,
  ) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepo.getUsers();
  }

  async getUserByPhone(phone: string): Promise<User> {
    const user = await this.userRepo.getUserByPhone(phone);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserByName(name: string): Promise<User> {
    const user = await this.userRepo.getUserByName(name);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async createUser(createUserProps: CreateUserProps): Promise<User> {
    const { name, phone, email, address, family } = createUserProps;
    const userExists = await this.userRepo.getUser({ name, phone, email });
    if (userExists) {
      throw new HttpException(`User already exists`, HttpStatus.BAD_REQUEST);
    }

    let userFamily;
    if (family) {
      userFamily = await this.userFamilyService.getUserFamilyByName(family);
    }

    const newUser = User.create({
      name,
      phone,
      email,
      address,
      familyId: userFamily?.id,
    });
    const createdUser = await this.userRepo.createUser(newUser);

    if (!family) {
      userFamily = await this.userFamilyService.createFamily(createdUser);
      await this.updateUserById(createdUser.id, { familyId: userFamily.id });
    }
    const user = await this.getUserById(createdUser.id);
    // Create an entry in the student payment balance table as well

    const studentPaymentBalance = StudentPaymentBalance.create({
      studentId: user.id,
      balance: 0,
    });

    await this.studentPaymentBalanceService.addStudentPaymentBalance(
      studentPaymentBalance,
    );

    return user;
  }

  async deleteUserById(id: number): Promise<void> {
    await this.getUserById(id);
    return await this.userRepo.deleteUserById(id);
  }

  async updateUserById(id: number, props: UpdateUserProps): Promise<User> {
    const user = await this.getUserById(id);
    const { name, phone, email, address, familyId } = props;
    const updatedUserEntity = user.patch({
      name,
      phone,
      email,
      address,
      familyId,
    });

    await this.userRepo.updateUserById(id, updatedUserEntity);
    return await this.getUserById(id);
  }
}
