import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './vehicle.schema';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

import { DeviceData, DeviceDataSchema } from './device-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: DeviceData.name, schema: DeviceDataSchema },
    ]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}