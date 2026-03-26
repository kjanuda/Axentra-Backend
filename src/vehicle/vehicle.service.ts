import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from './vehicle.schema';
import { Model } from 'mongoose';
import { DeviceData } from './device-data.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<Vehicle>,
    @InjectModel(DeviceData.name)
    private deviceDataModel: Model<DeviceData>,
  ) {}

  async connectVehicle(data) {
    return this.vehicleModel.create(data);
  }

  async getVehicles(userEmail: string) {
    return this.vehicleModel.find({ userEmail });
  }

  // ✅ NEW: Save device sensor data
  async saveDeviceData(data) {
    return this.deviceDataModel.create(data);
  }

  // ✅ NEW: Get device data (sorted by latest first)
  async getDeviceData(deviceId: string) {
    return this.deviceDataModel.find({ deviceId }).sort({ createdAt: -1 });
  }
}