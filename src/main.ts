import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.use(
    session({
      secret:            process.env.SESSION_SECRET || 'super-secret-key',
      resave:            false,
      saveUninitialized: false,
      cookie: {
        maxAge:   60000,
        httpOnly: true,
      },
    }),
  );

  app.enableCors({
    origin:      'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();