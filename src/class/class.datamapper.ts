import { UserMap } from 'src/user/user.datamapper';
import { Class } from './class.entity';
import { ClassModel } from './class.model';
import { ClassResponseDTO } from './dtos/class.dto';

export class ClassMap {
  static toDomain(model: ClassModel): Class {
    if (!model) {
      return null;
    }
    const { id, date, time, createdAt, updatedAt } = model;

    const projectedProps = {
      id,
      date,
      time,
      createdAt,
      updatedAt,
    };
    return Class.create(projectedProps);
  }

  static toPersistence(entity: Class): ClassModel {
    const { date, time } = entity.props;
    const raw = {
      date,
      time,
    };
    return raw as ClassModel;
  }

  static toClassDTO(entity: Class): ClassResponseDTO {
    if (entity === null) {
      return null;
    }
    const { id, date, time, createdAt, updatedAt } = entity;
    return {
      id,
      date,
      time,
      createdAt,
      updatedAt,
    };
  }
}
