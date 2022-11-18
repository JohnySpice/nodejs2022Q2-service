import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumExistsRule } from './album-exist.validator';
import { ArtistExistsRule } from './artist-exist.validator';

@Module({
  imports: [ArtistsModule, AlbumsModule],
  providers: [ArtistExistsRule, AlbumExistsRule],
})
export class UtilsModule {}
