import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserMap } from './user.datamapper';
import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from './dtos/user.dto';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_STUDENT } from './user.constants';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Get Student',
    description: 'Get Student by ID',
    apiId: 'yoga-1',
  })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserResponseDTO> {
    const user = await this.userService.getUserById(id);
    return UserMap.toUserDTO(user);
  }

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Get Students',
    description: 'Get all Students',
    apiId: 'yoga-2',
  })
  @Get()
  async getUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userService.getUsers();
    return users.map((e) => UserMap.toUserDTO(e));
  }

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Get Student by phone',
    description: 'Get Student by phone',
    apiId: 'yoga-3',
  })
  @Get('phone/:phone')
  async getUserByPhone(
    @Param('phone') phone: string,
  ): Promise<UserResponseDTO> {
    const user = await this.userService.getUserByPhone(phone);
    return UserMap.toUserDTO(user);
  }

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Create a new User',
    description: 'Create a new User',
    apiId: 'yoga-4',
  })
  @Post()
  async createUser(
    @Body() userCreateDTO: UserCreateDTO,
  ): Promise<UserResponseDTO> {
    const user = await this.userService.createUser(userCreateDTO);
    return UserMap.toUserDTO(user);
  }

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Delete User',
    description: 'Delete a User',
    apiId: 'yoga-5',
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<boolean> {
    await this.userService.deleteUserById(id);
    return true;
  }

  @YogaApi({
    tag: API_TAG_STUDENT,
    summary: 'Update a User',
    description: 'Update a User',
    apiId: 'yoga-6',
  })
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userUpdateDTO: UserUpdateDTO,
  ): Promise<UserResponseDTO> {
    const user = await this.userService.updateUserById(id, userUpdateDTO);
    return UserMap.toUserDTO(user);
  }
}
