import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ClassModel } from 'src/class/class.model';
import { StudentModel } from 'src/student/student.model';

@Table({
  tableName: 'class_student',
})
export class ClassStudentModel extends Model<ClassStudentModel> {
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
    field: 'class_id',
    onDelete: 'CASCADE',
  })
  @ForeignKey(() => ClassModel)
  classId: number;

  @BelongsTo(() => ClassModel)
  _class: ClassModel;

  @Column({
    allowNull: false,
    field: 'student_id',
  })
  @ForeignKey(() => StudentModel)
  studentId: number;

  @BelongsTo(() => StudentModel)
  student: StudentModel;

  @Column({
    defaultValue: 0,
    allowNull: true,
    field: 'fee',
  })
  fee: number;

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
