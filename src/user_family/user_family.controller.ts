import { Controller, Get } from '@nestjs/common';
import { UserFamilyService } from './user_family.service';
import { UserFamilyResponseDTO } from './dtos/user_family.dto';
import { UserFamilyMap } from './user_family.datamapper';
import { YogaApi } from 'src/common/openapi/yoga-api.decorator';
import { API_TAG_FAMILY } from './user_family.constants';

@Controller('families')
export class UserFamilyController {
  constructor(private readonly userFamilyService: UserFamilyService) {}

  @YogaApi({
    tag: API_TAG_FAMILY,
    summary: 'Get families',
    description: 'Get all families',
    apiId: 'yoga-7',
  })
  @Get()
  async getFamilies(): Promise<UserFamilyResponseDTO[]> {
    const users = await this.userFamilyService.getFamilies();
    return users.map((e) => UserFamilyMap.toUserFamilyDTO(e));
  }
}
