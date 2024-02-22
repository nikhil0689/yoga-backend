import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ClassModel } from 'src/class/class.model';
import { ClassStudentModel } from 'src/class_student/class_student.model';
import { UserFamilyModel } from 'src/user_family/user_family.model';

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
    allowNull: false,
    field: 'name',
  })
  name: string;

  @Column({
    unique: true,
    allowNull: true,
    field: 'email',
  })
  email?: string;

  @Column({
    defaultValue: null,
    allowNull: true,
    field: 'phone',
  })
  phone?: string;

  @Column({
    defaultValue: null,
    allowNull: true,
    field: 'address',
  })
  address?: string;

  @Column({
    field: 'family_id',
  })
  @ForeignKey(() => UserFamilyModel)
  familyId?: number;

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

  @BelongsToMany(
    () => ClassModel, // Target model we are trying to fetch (through the join table)
    () => ClassStudentModel, // "through" (join) table model
  )
  classes: ClassModel[];
}
