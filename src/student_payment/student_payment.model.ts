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
  tableName: 'student_payment',
})
export class StudentPaymentModel extends Model<StudentPaymentModel> {
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
    field: 'student_id',
  })
  @ForeignKey(() => StudentModel)
  studentId: number;

  @BelongsTo(() => StudentModel)
  student: StudentModel;

  @Column({
    allowNull: false,
    field: 'payment',
  })
  payment: number;

  @Column({
    allowNull: false,
    field: 'date',
  })
  date: string;

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
