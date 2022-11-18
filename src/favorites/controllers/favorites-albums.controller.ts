import {
  Controller,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { AlbumValidationPipe } from 'src/utils';
import { FavoritesService } from '../favorites.service';

@Controller('favs/album')
export class FavoritesAlbumController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Post(':id')
  addAlbums(@Param('id', ParseUUIDPipe, AlbumValidationPipe) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbums(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.removeAlbum(id);
    if (!result.success) {
      throw new NotFoundException(result.message);
    }
    return;
  }
}
