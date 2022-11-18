import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class AlbumValidationPipe implements PipeTransform {
  constructor(
    private albumService: AlbumsService,
  ) {}

  async transform(id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Album not found exist`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return album;
  }
}
