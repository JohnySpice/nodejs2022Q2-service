import { Module } from '@nestjs/common';
import { ArtistsModule } from 'src/artists/artists.module';
import { ArtistExistsRule } from './artist-exist.validator';

@Module({
  imports: [ArtistsModule],
  providers: [ArtistExistsRule],
})
export class UtilsModule {}
