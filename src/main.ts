import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(PORT);
}
bootstrap();
