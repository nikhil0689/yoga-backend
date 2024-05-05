import { MonthlyClassProps } from 'src/class/class.entity';
import { DashboardStats } from './dashboard.entity';
import {
  DashboardMonthlyClassesStatsResponseDTO,
  DashboardStatsResponseDTO,
  MonthlyPaymentsStatResponseDTO,
  MonthlyStatResponseDTO,
} from './dtos/dashboard.dto';
import { MonthlyPaymentProps } from 'src/student_payment/student_payment.entity';

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

  static toMonthlyClassesStatDTO(
    entity: MonthlyClassProps,
  ): MonthlyStatResponseDTO {
    if (entity === null) {
      return null;
    }

    const { year, month, classes } = entity;

    return {
      year,
      month,
      classes,
    };
  }

  static toMonthlyClassesStatsDTO(
    entity: MonthlyClassProps[],
  ): DashboardMonthlyClassesStatsResponseDTO {
    if (entity === null) {
      return null;
    }

    const monthlyStatDTOs = entity.map((e) => this.toMonthlyClassesStatDTO(e));

    return { data: monthlyStatDTOs };
  }

  static toMonthlyPaymentsStatDTO(
    entity: MonthlyPaymentProps,
  ): MonthlyPaymentsStatResponseDTO {
    if (entity === null) {
      return null;
    }

    const { year, month, payments } = entity;

    return {
      year,
      month,
      payments,
    };
  }

  static toMonthlyPaymentsStatsDTO(paymentsStats: MonthlyPaymentProps[]) {
    if (paymentsStats === null) {
      return null;
    }

    const monthlyPaymentsStatDTOs = paymentsStats.map((e) =>
      this.toMonthlyPaymentsStatDTO(e),
    );

    return { data: monthlyPaymentsStatDTOs };
  }
}
