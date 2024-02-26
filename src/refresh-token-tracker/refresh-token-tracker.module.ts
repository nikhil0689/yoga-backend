import { Module } from '@nestjs/common';
import { RefreshTokenTrackerService } from './refresh-token-tracker.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshTokenTrackerModel } from './refresh-token-tracker.model';
import { RefreshTokenTrackerRepository } from './refresh-token-tracker.repository';

@Module({
  imports: [SequelizeModule.forFeature([RefreshTokenTrackerModel])],
  providers: [RefreshTokenTrackerService, RefreshTokenTrackerRepository],
  exports: [RefreshTokenTrackerService],
})
export class RefreshTokenTrackerModule {}
