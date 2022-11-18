import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumInFavoriteValidationPipe implements PipeTransform {
  constructor(private favoritesService: FavoritesService) {}

  async transform(id: string) {
    const fav = await this.favoritesService.getAll();
    const albumId = fav.albums.findIndex((a) => a.id === id);
    if (albumId === -1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Album not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return albumId;
  }
}
