import {
  PipeTransform,
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsRepository } from 'src/albums/repository/allbums.repository';

@Injectable()
export class AlbumValidationPipe implements PipeTransform {
  constructor(
    @Inject(AlbumsRepository) private albumsRepository: AlbumsRepository,
  ) {}

  transform(id: string) {
    const album = this.albumsRepository.findById(id);
    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Album doesn\'t exist`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return id;
  }
}
