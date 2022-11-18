import {
  Controller,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  SetMetadata,
} from '@nestjs/common';
import { Artist } from 'src/artists/entities/artist.entity';
import { ArtistValidationPipe } from 'src/utils';
import { ArtistInFavoriteValidationPipe } from 'src/utils';
import { Repository } from 'typeorm';
import { FavoritesService } from '../favorites.service';

@Controller('favs/artist')
export class FavoritsArtistController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':id')
  @SetMetadata('entity', Repository<Artist>)
  addArtist(@Param('id', ParseUUIDPipe, ArtistValidationPipe) artist: Artist) {
    return this.favoritesService.addArtist(artist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id', ParseUUIDPipe, ArtistInFavoriteValidationPipe) id: number,
  ) {
    return this.favoritesService.removeArtist(id);
  }
}
