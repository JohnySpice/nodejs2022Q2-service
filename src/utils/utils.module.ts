import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumExistsRule } from './album-exist.validator';
import { ArtistExistsRule } from './artist-exist.validator';
@Module({
  imports: [AlbumsModule, ArtistsModule, TracksModule],
  providers: [ArtistExistsRule, AlbumExistsRule],
})
export class UtilsModule {}
