import {
  Controller,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { AlbumValidationPipe } from 'src/utils';
import { AlbumInFavoriteValidationPipe } from 'src/utils';
import { FavoritesService } from '../favorites.service';

@Controller('favs/album')
export class FavoritesAlbumController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':id')
  addAlbums(@Param('id', ParseUUIDPipe, AlbumValidationPipe) album: Album) {
    return this.favoritesService.addAlbum(album);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbums(
    @Param('id', ParseUUIDPipe, AlbumInFavoriteValidationPipe) id: number,
  ) {
    return this.favoritesService.removeAlbum(id);
  }
}
