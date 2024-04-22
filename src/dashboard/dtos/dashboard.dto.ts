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
