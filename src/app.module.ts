// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AdminModule } from './admin/admin.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: '.env',
//     }),
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         uri: configService.get<string>('MONGODB_URI'),
//       }),
//       inject: [ConfigService],
//     }),
//     AdminModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI! || 'mongodb://localhost/nestdb',
    ),
    AdminModule,
    RestaurantModule,
  ],
})
export class AppModule {}
