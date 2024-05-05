import { ApiProperty } from '@nestjs/swagger';

export class DashboardStatsResponseDTO {
  @ApiProperty()
  readonly students: number;

  @ApiProperty()
  readonly classes: number;

  @ApiProperty()
  readonly payments: number;

  @ApiProperty()
  readonly balance: number;
}

export class MonthlyStatResponseDTO {
  @ApiProperty()
  readonly year: number;

  @ApiProperty()
  readonly classes: number;

  @ApiProperty()
  readonly month: string;
}

export class DashboardMonthlyClassesStatsResponseDTO {
  @ApiProperty()
  readonly data: MonthlyStatResponseDTO[];
}

export class MonthlyPaymentsStatResponseDTO {
  @ApiProperty()
  readonly year: number;

  @ApiProperty()
  readonly payments: number;

  @ApiProperty()
  readonly month: string;
}

export class DashboardMonthlyPaymentsStatsResponseDTO {
  @ApiProperty()
  readonly data: MonthlyPaymentsStatResponseDTO[];
}
