import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistsRepository: Repository<Artist>,
  ) { }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.artistsRepository.create(createArtistDto);
    return this.artistsRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    return this.artistsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist: Artist = await this.findOne(id);
    if (!artist) {
      return artist;
    }
    await this.artistsRepository.save({
      id: id,
      ...updateArtistDto,
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.artistsRepository.delete({ id });
    return result.affected ? result.raw : null;
  }
}
