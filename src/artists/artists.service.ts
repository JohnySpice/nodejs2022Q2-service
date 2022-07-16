import { Inject, Injectable } from '@nestjs/common';
import { AlbumsRepository } from 'src/albums/repository/allbums.repository';
import { FavoritesRepository } from 'src/favorites/repository/favorites.repository';
import { TracksRepository } from 'src/tracks/repository/tracks.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private artistsRepository: ArtistsRepository,
    @Inject(TracksRepository) private tracksRepository: TracksRepository,
    @Inject(AlbumsRepository) private albumsRepository: AlbumsRepository,
    @Inject(FavoritesRepository)
    private favoriteRepository: FavoritesRepository,
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
    this.tracksRepository.removeArtist(id);
    this.albumsRepository.removeArtist(id);
    this.favoriteRepository.removeArtist(id);
    return result;
  }
}
