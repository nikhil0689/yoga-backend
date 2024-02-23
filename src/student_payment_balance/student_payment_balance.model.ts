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
  tableName: 'student_payment_balance',
})
export class StudentPaymentBalanceModel extends Model<StudentPaymentBalanceModel> {
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
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @ForeignKey(() => StudentModel)
  studentId: number;

  @BelongsTo(() => StudentModel)
  student: StudentModel;

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
