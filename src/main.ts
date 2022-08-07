import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ClassSerializerInterceptor, InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './utils/exceptions.filter';


async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(PORT);
  process
    .on('unhandledRejection', () => {
      app.get(LoggerService).error('Unhandled rejection');
    })
    .on('uncaughtException', () => {
      app.get(LoggerService).error('Uncaught exception');
    });
}
bootstrap();
