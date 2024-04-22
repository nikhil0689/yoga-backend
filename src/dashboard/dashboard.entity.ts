import { Entity, proxyEntity } from 'entity';

export interface DashboardStatsProps {
  readonly students: number;
  readonly classes: number;
  readonly payments: number;
  readonly balance: number;
}

export class DashboardStats extends Entity<DashboardStatsProps> {
  private constructor(props: DashboardStatsProps) {
    super(props);
  }
  static create(props: DashboardStatsProps): DashboardStats {
    return proxyEntity(new DashboardStats(props));
  }
}
