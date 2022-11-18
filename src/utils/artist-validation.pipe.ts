import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ArtistsService } from 'src/artists/artists.service';
@Injectable()
export class ArtistValidationPipe implements PipeTransform {
  constructor(
    private artistService: ArtistsService,
  ) {}

  async transform(id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Artist not found`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return artist;
  }
}
