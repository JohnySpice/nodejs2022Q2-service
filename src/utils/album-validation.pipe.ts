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
    // @InjectRepository(Album) private albumsRepository: Repository<Album>,
    private albumService: AlbumsService,
  ) {}

  async transform(id: string) {
    const album = await this.albumService.findOne(id);
    console.dir(album);
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
