import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [AlbumsModule, ArtistsModule, TracksModule],
})
export class UtilsModule {}
