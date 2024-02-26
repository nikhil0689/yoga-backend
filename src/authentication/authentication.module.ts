import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshStrategy } from './strategies/refresh-strategy';
import { AuthJwtService } from './auth-jwt.service';
import { LocalStrategy } from './strategies/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenTrackerModule } from 'src/refresh-token-tracker/refresh-token-tracker.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    PassportModule,
    RefreshTokenTrackerModule,
  ],
  providers: [
    AuthenticationService,
    AuthJwtService,
    JwtStrategy,
    RefreshStrategy,
    LocalStrategy,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
