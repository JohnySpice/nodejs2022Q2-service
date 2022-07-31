import {
  Controller,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Track } from 'src/tracks/entities/track.entity';
import { TrackValidationPipe } from 'src/utils';
import { TrackInFavoriteValidationPipe } from 'src/utils';
import { FavoritesService } from '../favorites.service';

@Controller('favs/track')
export class FavoritesTrackController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':id')
  addTrack(@Param('id', ParseUUIDPipe, TrackValidationPipe) track: Track) {
    return this.favoritesService.addTrack(track);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id', ParseUUIDPipe, TrackInFavoriteValidationPipe) id: number,
  ) {
    return this.favoritesService.removeTrack(id);
  }
}
