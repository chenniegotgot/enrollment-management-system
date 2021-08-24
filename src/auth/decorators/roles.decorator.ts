import { SetMetadata } from '@nestjs/common';
import { Roles } from '../../common/enums/roles';

export const RolesAllowed = (...roles: Roles[]) => SetMetadata('roles', roles);
