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
import { ArtistValidationPipe } from 'src/utils';
import { FavoritesService } from '../favorites.service';

@Controller('favs/artist')
export class FavoritsArtistController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':id')
  addArtist(@Param('id', ParseUUIDPipe, ArtistValidationPipe) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.removeArtist(id);
    if (!result.success) {
      throw new NotFoundException(result.message);
    }
    return;
  }
}
