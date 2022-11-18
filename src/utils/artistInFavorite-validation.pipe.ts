import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistInFavoriteValidationPipe implements PipeTransform {
  constructor(private favoritesService: FavoritesService) {}

  async transform(id: string) {
    const fav = await this.favoritesService.getAll();
    const artistId = fav.artists.findIndex((a) => a.id === id);
    if (artistId === -1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Artist not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return artistId;
  }
}
