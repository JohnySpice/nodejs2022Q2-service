import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesRepository } from './repository/favorites.repository';
import { FavoritesController } from './favorite.controller';
import {
  FavoritesTrackController,
  FavoritsArtistController,
  FavoritesAlbumController,
} from './controllers';

@Module({
  imports: [TracksModule, ArtistsModule, AlbumsModule],
  controllers: [
    FavoritesController,
    FavoritesTrackController,
    FavoritsArtistController,
    FavoritesAlbumController,
  ],
  providers: [FavoritesService, FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
