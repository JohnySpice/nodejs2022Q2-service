import {
  PipeTransform,
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TracksRepository } from 'src/tracks/repository/tracks.repository';

@Injectable()
export class TrackValidationPipe implements PipeTransform {
  constructor(
    @Inject(TracksRepository) private tracksRepository: TracksRepository,
  ) {}

  transform(id: string) {
    const track = this.tracksRepository.findById(id);
    if (!track) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Track doesn\'t exist`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return id;
  }
}
