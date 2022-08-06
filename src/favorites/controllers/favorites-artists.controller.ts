import {
  Controller,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Artist } from 'src/artists/entities/artist.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ArtistValidationPipe } from 'src/utils';
import { ArtistInFavoriteValidationPipe } from 'src/utils';
import { Repository } from 'typeorm';
import { FavoritesService } from '../favorites.service';

@Controller('favs/artist')
@UseGuards(JwtAuthGuard)
export class FavoritsArtistController {
  constructor(private readonly favoritesService: FavoritesService) { }

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
