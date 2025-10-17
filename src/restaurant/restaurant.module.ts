// import { Module } from '@nestjs/common';
// import { RestaurantService } from './restaurant.service';
// import { RestaurantController } from './restaurant.controller';

// @Module({
//   providers: [RestaurantService],
//   controllers: [RestaurantController],
// })
// export class RestaurantModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { Restaurant, RestaurantSchema } from 'models/resturent/restaurant';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
