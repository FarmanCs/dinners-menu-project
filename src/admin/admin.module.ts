import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Permission, PermissionSchema } from 'models/user/permissionSchema';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';
import { User, UserSchema } from 'models/user/userSchema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AdminController, PermissionController],
  providers: [AdminService, PermissionService],
})
export class AdminModule {}
