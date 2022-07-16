import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';

@Injectable()
export class ArtistsService {
  constructor(private artistsRepository: ArtistsRepository) {}

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
    return this.artistsRepository.deleteOne(id);
  }
}
