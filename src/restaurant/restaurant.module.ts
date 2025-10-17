import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { Restaurant, RestaurantSchema } from 'models/resturent/restaurant';
import { MenuService } from './menu/menu.service';

import {
  RestaurantMenu,
  RestaurantMenuSchema,
} from 'models/resturent/restaurant-menu';
import { MenuController } from './menu/menu.controller';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import {
  RestaurantTable,
  RestaurantTableSchema,
} from 'models/resturent/restaurant-table';
import { MenuVariant, MenuVariantSchema } from 'models/resturent/menu-varients';
import { MenuVarientsController } from './menu-varients/menu-varients.controller';
import { MenuVarientsService } from './menu-varients/menu-varients.service';
import { TableService } from './table/table.service';
import { TableController } from './table/table.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: RestaurantMenu.name, schema: RestaurantMenuSchema },
      { name: RestaurantTable.name, schema: RestaurantTableSchema },
      { name: MenuVariant.name, schema: MenuVariantSchema },
    ]),
  ],
  controllers: [
    RestaurantController,
    MenuController,
    CategoryController,
    MenuVarientsController,
    TableController,
  ],
  providers: [
    RestaurantService,
    MenuService,
    CategoryService,
    MenuVarientsService,
    TableService,
  ],
  exports: [TableService, MongooseModule],
})
export class RestaurantModule {}
