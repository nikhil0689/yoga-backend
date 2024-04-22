import { DashboardStats } from './dashboard.entity';
import { DashboardStatsResponseDTO } from './dtos/dashboard.dto';

export class DashboardMap {
  static toDashboardStatsDTO(
    entity: DashboardStats,
  ): DashboardStatsResponseDTO {
    if (entity === null) {
      return null;
    }
    const { students, classes, payments, balance } = entity;
    return {
      students,
      classes,
      payments,
      balance,
    };
  }
}
