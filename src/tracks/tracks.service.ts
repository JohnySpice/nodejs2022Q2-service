import { Inject, Injectable } from '@nestjs/common';
import { FavoritesRepository } from 'src/favorites/repository/favorites.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TracksRepository } from './repository/tracks.repository';

@Injectable()
export class TracksService {
  constructor(
    private tracksRepository: TracksRepository,
    @Inject(FavoritesRepository)
    private favoriteRepository: FavoritesRepository,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    return this.tracksRepository.create(createTrackDto);
  }

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    return this.tracksRepository.findById(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    return this.tracksRepository.findByIdAndUpdate(id, updateTrackDto);
  }

  async remove(id: string) {
    const result = this.tracksRepository.deleteOne(id);
    if (!result) {
      return;
    }
    this.favoriteRepository.removeTrack(id);
    return result;
  }
}
