import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './users.schema';
import { Recommendation, RecommendationSchema } from './recommendation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: 'Recommendation', schema: RecommendationSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],

  // ✅ THIS IS THE FIX
  exports: [UsersService],
})
export class UsersModule {}