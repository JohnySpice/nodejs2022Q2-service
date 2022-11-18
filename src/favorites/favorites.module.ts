import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesController } from './favorite.controller';
import {
  FavoritesTrackController,
  FavoritsArtistController,
  FavoritesAlbumController,
} from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([Favorite]),
  ],
  controllers: [
    FavoritesController,
    FavoritesTrackController,
    FavoritsArtistController,
    FavoritesAlbumController,
  ],
  providers: [FavoritesService],
})
export class FavoritesModule {}
