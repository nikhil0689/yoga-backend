import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { StudentModel } from 'src/student/student.model';

@Table({
  tableName: 'family',
})
export class StudentFamilyModel extends Model<StudentFamilyModel> {
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
  @ForeignKey(() => StudentModel)
  ownerId: number;

  @BelongsTo(() => StudentModel)
  owner: StudentModel;

  @Column({
    allowNull: false,
    field: 'balance',
  })
  balance: number;

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
