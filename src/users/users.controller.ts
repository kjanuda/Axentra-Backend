import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ Create User
  @Post()
  create(@Body() body: any) {
    return this.usersService.createUser(body);
  }

  // ✅ Get All Users
  @Get()
  findAll() {
    return this.usersService.getUsers();
  }

  // ============================================================
  // ✅ RECOMMENDATION APIs
  // ============================================================

  // ✅ Add Recommendation
  @Post('recommendation')
  addRec(@Body() body: any) {
    return this.usersService.addRecommendation(body);
  }

  // ✅ Get Recommendations by Email
  @Get('recommendation')
  getRec(@Query('email') email: string) {
    return this.usersService.getRecommendations(email);
  }

   // ✅ GET ALL recommendations (🔥 THIS IS WHAT YOU ASKED)
  @Get('recommendation/all')
  getAllRecommendations() {
    return this.usersService.getAllRecommendations();
  }

  
}