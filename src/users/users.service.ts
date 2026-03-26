import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<any>,
    @InjectModel('Recommendation') private recModel: Model<any>,
  ) {}

  // ✅ CREATE USER (manual)
  async createUser(data) {
    return await this.userModel.create(data);
  }

  // ✅ GET ALL USERS
  async getUsers() {
    return await this.userModel.find();
  }

  // ✅ Google Login + IP tracking + isNew flag
  async findOrCreate(
    email: string,
    name: string,
    ip: string,
    photo?: string,
  ) {
    let user = await this.userModel.findOne({ email });

    // 🆕 NEW USER
    if (!user) {
      user = await this.userModel.create({
        email,
        name,
        ipAddress: ip,
        photo,
      });

      return {
        user,
        isNew: true,
      };
    }

    // 🔁 EXISTING USER - update IP & photo
    let updated = false;

    if (user.ipAddress !== ip) {
      user.ipAddress = ip;
      updated = true;
    }

    if (photo && user.photo !== photo) {
      user.photo = photo;
      updated = true;
    }

    if (updated) {
      await user.save();
    }

    return {
      user,
      isNew: false,
    };
  }

  // ============================================================
  // ✅ RECOMMENDATION FUNCTIONS
  // ============================================================

  // ✅ Add Recommendation (email-based)
  async addRecommendation(data: {
    userEmail: string;
    text: string;
    organization: string;
  }) {
    return await this.recModel.create(data);
  }

  // ✅ Get Recommendations by Email
  async getRecommendations(email: string) {
    return await this.recModel
      .find({ userEmail: email })
      .sort({ createdAt: -1 }); // latest first
  }

  // ============================================================
  // 🔥 BEST PRACTICE VERSION (userId based)
  // ============================================================

  // ✅ Add Recommendation (recommended way)
  async addRecommendationByUserId(
    userId: string,
    text: string,
    organization: string,
  ) {
    return await this.recModel.create({
      userId,
      text,
      organization,
    });
  }

  async getAllRecommendations() {
  return this.recModel.find().sort({ createdAt: -1 });
}

  // ✅ Get Recommendations by UserId
  async getRecommendationsByUserId(userId: string) {
    return await this.recModel
      .find({ userId })
      .sort({ createdAt: -1 });
  }
}