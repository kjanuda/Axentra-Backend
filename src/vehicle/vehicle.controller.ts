import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('connect')
  connect(@Body() body) {
    return this.vehicleService.connectVehicle(body);
  }

  @Get()
  get(@Query('email') email: string) {
    return this.vehicleService.getVehicles(email);
  }

  // 📡 ESP32 sends sensor data
  @Post('device-data')
  async receiveDeviceData(@Body() body) {
    const { deviceId } = body;

    if (!deviceId) {
      return { message: "Missing deviceId ❌" };
    }

    await this.vehicleService.saveDeviceData(body);

    return { message: "Data received ✅" };
  }

  // 📊 GET DATA FOR DASHBOARD
  @Get('data')
  getData(@Query('deviceId') deviceId: string) {
    return this.vehicleService.getDeviceData(deviceId);
  }
}