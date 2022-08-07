import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { UtilsModule } from './utils/utils.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import configService from './config/ormconfig';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService),
    UserModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    UtilsModule,
    FavoritesModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
