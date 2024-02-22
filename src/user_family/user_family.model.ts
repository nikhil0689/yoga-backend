import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from 'src/user/user.model';

@Table({
  tableName: 'family',
})
export class UserFamilyModel extends Model<UserFamilyModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: 'id',
  })
  id: number;

  @Column({
    defaultValue: null,
    allowNull: true,
    field: 'family_name',
  })
  familyName: string;

  @Column({
    allowNull: false,
    field: 'owner_id',
  })
  @ForeignKey(() => UserModel)
  ownerId: number;

  @BelongsTo(() => UserModel)
  owner: UserModel;

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
