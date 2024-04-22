import { Controller, Get, UseGuards } from '@nestjs/common';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_PAYMENT } from 'src/student_payment/payment.constants';
import { User } from './user.entity';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { UserMap } from './user.datamapper';
import { UserResponseDTO } from './dtos/user.response.dto';

@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  @YogaApi({
    tag: API_TAG_PAYMENT,
    summary: 'Get Student Payments',
    description: 'Get Student Payments',
    apiId: 'yoga-1',
  })
  @Get('me')
  async getSessionUser(@RequestUser() user: User): Promise<UserResponseDTO> {
    return UserMap.toUserResponseDTO(user);
  }
}
