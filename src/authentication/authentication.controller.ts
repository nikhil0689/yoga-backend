import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from './dtos/authentication.dto';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_AUTHENTICATION } from './authentication.constants';
import { LocalAuthGuard } from 'src/authentication/guards/local-auth.guard';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { RefreshTokenGuard } from 'src/authentication/guards/refresh-token.guard';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RequestUserId } from 'src/decorators/request-user-id.decorator';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

@Controller('authenticate')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @YogaApi({
    tag: API_TAG_AUTHENTICATION,
    summary: 'Logout',
    description: 'Logout user',
    apiId: 'yoga-1',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@RequestUserId() userId: string, @Res() response: Response) {
    console.log('userId being logged out: ', userId);
    await this.authenticationService.logOut(userId);
    response.clearCookie('jwt');
    response.json(true);
  }

  @YogaApi({
    tag: API_TAG_AUTHENTICATION,
    summary: 'Login',
    description: 'Login using user id and password',
    apiId: 'yoga-1',
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @RequestUser() user,
    @Body() dto: LoginDTO,
    @Res() response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authenticationService.login(user);
    console.log('user details: ', user);
    response.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    response.json({ accessToken, user });
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
    @Res() response: Response,
  ) {
    console.log('coming inside refresh, ', refreshToken);
    const user = await this.userService.getUserById(userId);
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authenticationService.refreshTokens(userId, refreshToken);

    response.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    response.json({ accessToken, user });
  }
}
