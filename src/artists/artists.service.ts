import { Inject, Injectable } from '@nestjs/common';
import { TracksRepository } from 'src/tracks/repository/tracks.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private artistsRepository: ArtistsRepository,
    @Inject(TracksRepository) private trackRepository: TracksRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsRepository.create(createArtistDto);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    return this.artistsRepository.findById(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.artistsRepository.findByIdAndUpdate(id, updateArtistDto);
  }

  async remove(id: string) {
    const result = this.artistsRepository.deleteOne(id);
    if (!result) {
      return;
    }
    this.trackRepository.removeArtist(id);
    return result;
  }
}
