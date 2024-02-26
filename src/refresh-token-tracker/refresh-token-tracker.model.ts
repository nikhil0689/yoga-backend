import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'refresh_token_tracker',
})
export class RefreshTokenTrackerModel extends Model<RefreshTokenTrackerModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    field: 'id',
  })
  primaryKey: number;

  @Column({
    type: DataType.CHAR(20),
    primaryKey: true,
    field: 'user_id',
  })
  userId: string;

  @Column({
    primaryKey: true,
    type: DataType.STRING(190),
    field: 'refresh_token_hash',
  })
  refreshTokenHash: string;

  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;
}
