import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from './dtos/authentication.dto';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_AUTHENTICATION } from './authentication.constants';
import { LocalAuthGuard } from 'src/authentication/guards/local-auth.guard';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { User } from 'src/user/user.entity';
import { RefreshTokenGuard } from 'src/authentication/guards/refresh-token.guard';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RequestUserId } from 'src/decorators/request-user-id.decorator';

@Controller('authenticate')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @YogaApi({
    tag: API_TAG_AUTHENTICATION,
    summary: 'Login',
    description: 'Login using user id and password',
    apiId: 'yoga-1',
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@RequestUser() user, @Body() dto: LoginDTO) {
    return await this.authenticationService.login(user);
  }

  @YogaApi({
    tag: API_TAG_AUTHENTICATION,
    summary: 'Logout',
    description: 'Logout user',
    apiId: 'yoga-1',
  })
  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@RequestUserId() userId: string) {
    await this.authenticationService.logOut(userId);
  }

  @YogaApi({
    tag: API_TAG_AUTHENTICATION,
    summary: 'Refresh token',
    description: 'Refresh access token',
    apiId: 'yoga-1',
  })
  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(
    @RequestUserId() userId: string,
    @RequestUser('refreshToken') refreshToken: string,
  ) {
    return this.authenticationService.refreshTokens(userId, refreshToken);
  }
}
