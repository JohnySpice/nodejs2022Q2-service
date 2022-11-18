import {
  PipeTransform,
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ArtistsRepository } from 'src/artists/repository/artists.repository';

@Injectable()
export class ArtistValidationPipe implements PipeTransform {
  constructor(
    @Inject(ArtistsRepository) private artistsRepository: ArtistsRepository,
  ) {}

  transform(id: string) {
    const artist = this.artistsRepository.findById(id);
    if (!artist) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Artist doesn\'t exist`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return id;
  }
}
