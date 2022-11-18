import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackInFavoriteValidationPipe implements PipeTransform {
  constructor(private favoritesService: FavoritesService) {}

  async transform(id: string) {
    const fav = await this.favoritesService.getAll();
    const trackId = fav.tracks.findIndex((t) => t.id === id);
    if (trackId === -1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Track not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return trackId;
  }
}
