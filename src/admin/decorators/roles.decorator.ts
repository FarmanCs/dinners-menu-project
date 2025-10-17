// src/admin/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// src/admin/guards/roles.guard.ts

// Usage example in controller:
// @Post('users')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles('admin', 'superadmin')
// @ApiBearerAuth()
// create(@Body() createUserDto: CreateUserDto) {
//   return this.adminService.create(createUserDto);
// }
