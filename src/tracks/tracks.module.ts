import { Module, forwardRef } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './repository/tracks.repository';
import { FavoritesRepository } from 'src/favorites/repository/favorites.repository';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksRepository],
})
export class TracksModule { }
