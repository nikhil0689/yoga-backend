import { Controller, Get, UseGuards } from '@nestjs/common';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { DashboardStatsResponseDTO } from './dtos/dashboard.dto';
import { API_TAG_DASHBOARD } from './dashboard.constants';
import { DashboardService } from './dashboard.service';
import { DashboardMap } from './dashboard.datamapper';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';

@Controller('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @YogaApi({
    tag: API_TAG_DASHBOARD,
    summary: 'Get Dashboard Stats',
    description: 'Get Dashboard Stats',
    apiId: 'yoga-1',
  })
  @Get('stats')
  async getDashboardStats(): Promise<DashboardStatsResponseDTO> {
    const stats = await this.dashboardService.getStats();
    return DashboardMap.toDashboardStatsDTO(stats);
  }
}
