import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TableController } from './restaurant/table/table.controller';
import { TableService } from './restaurant/table/table.service';
import { MenuVarientsService } from './restaurant/menu-varients/menu-varients.service';
import { MenuVarientsController } from './restaurant/menu-varients/menu-varients.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI! || 'mongodb://localhost/nestdb',
    ),
    AdminModule,
    RestaurantModule,
  ],
  controllers: [TableController, MenuVarientsController],
  providers: [TableService, MenuVarientsService],
})
export class AppModule {}
