import {
  Controller,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { TrackValidationPipe } from 'src/utils';
import { FavoritesService } from '../favorites.service';

@Controller('favs/track')
export class FavoritesTrackController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':id')
  addTrack(@Param('id', ParseUUIDPipe, TrackValidationPipe) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.removeTrack(id);
    if (!result.success) {
      throw new NotFoundException(result.message);
    }
    return;
  }
}
