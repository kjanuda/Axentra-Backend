import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ env vars available everywhere including GoogleStrategy
    }),
    MongooseModule.forRoot('mongodb+srv://project360aa00_db_user:InOw3VIVu5yRrSYD@cluster0.imqwf8p.mongodb.net/axentra?retryWrites=true&w=majority'),
    UsersModule,
    AuthModule,
    VehicleModule,
  ],
})
export class AppModule {}