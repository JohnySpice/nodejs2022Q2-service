import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class TrackValidationPipe implements PipeTransform {
  constructor(private tracksService: TracksService) {}

  async transform(id: string) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Track doesn\'t exist`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return track;
  }
}
