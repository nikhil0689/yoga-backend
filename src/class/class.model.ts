import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ClassStudentModel } from 'src/class_student/class_student.model';
import { UserModel } from 'src/user/user.model';

@Table({
  tableName: 'class',
})
export class ClassModel extends Model<ClassModel> {
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
    field: 'date',
  })
  date: string;

  @Column({
    allowNull: false,
    field: 'time',
  })
  time: string;

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

  // Show.belongsToMany(User, { as: 'bands', through: ShowBand, foreignKey: { name: 'id_show', allowNull: false } });

  @BelongsToMany(
    () => UserModel, // Target model we are trying to fetch (through the join table)
    () => ClassStudentModel, // "through" (join) table model
  )
  students: UserModel[];
}
