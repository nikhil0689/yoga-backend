import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class UserModel extends Model<UserModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: 'id',
  })
  id: number;

  @Column({
    type: DataType.CHAR(20),
    unique: true,
    allowNull: false,
    field: 'unique_id',
  })
  uniqueId: string;

  @Column({
    unique: true,
    allowNull: false,
    field: 'email',
  })
  email: string;

  @Column({
    defaultValue: null,
    allowNull: true,
    field: 'last_name',
  })
  lastName?: string;

  @Column({
    defaultValue: null,
    allowNull: true,
    field: 'first_name',
  })
  firstName?: string;

  @Column({
    allowNull: false,
    field: 'password',
  })
  password?: string;

  @Column({
    allowNull: false,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    allowNull: false,
    field: 'updated_at',
  })
  updatedAt: Date;
}
