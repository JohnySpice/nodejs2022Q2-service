import { Inject, Injectable } from '@nestjs/common';
import { AlbumsRepository } from 'src/albums/repository/allbums.repository';
import { ArtistsRepository } from 'src/artists/repository/artists.repository';
import { TracksRepository } from 'src/tracks/repository/tracks.repository';
import { FavoriteResponseDto } from './dto/favorite-response.dto';
import { FavoritesRepository } from './repository/favorites.repository';

type RemoveResult = {
  success: boolean;
  message?: string;
};

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    @Inject(TracksRepository) private tracksRepository: TracksRepository,
    @Inject(AlbumsRepository) private albumsRepository: AlbumsRepository,
    @Inject(ArtistsRepository) private artistsRepository: ArtistsRepository,
  ) {}

  async getAll(): Promise<FavoriteResponseDto> {
    const favourites = this.favoritesRepository.find();
    const tracks = favourites.tracksIds.map((trackId) =>
      this.tracksRepository.findById(trackId),
    );
    const albums = favourites.albumsIds.map((albumId) =>
      this.albumsRepository.findById(albumId),
    );
    const artists = favourites.artistsIds.map((artistId) =>
      this.artistsRepository.findById(artistId),
    );
    return {
      tracks,
      albums,
      artists,
    };
  }

  async removeResult(item: any, type: string): Promise<RemoveResult> {
    if (!item) {
      return {
        success: false,
        message: `${type} is not favorite`,
      };
    }
    return {
      success: true,
    };
  }

  async addTrack(id: string) {
    this.favoritesRepository.addTrack(id);
    return { message: 'Track added to favorite' };
  }

  async removeTrack(id: string) {
    const result = this.favoritesRepository.removeTrack(id);
    return this.removeResult(result, 'Track');
  }

  async addAlbum(id: string) {
    this.favoritesRepository.addAlbum(id);
    return { message: 'Album added to favorite' };
  }

  async removeAlbum(id: string) {
    const result = this.favoritesRepository.removeAlbum(id);
    return this.removeResult(result, 'Album');
  }

  async addArtist(id: string) {
    this.favoritesRepository.addArtist(id);
    return { message: 'Artist added to favorite' };
  }

  async removeArtist(id: string) {
    const result = this.favoritesRepository.removeArtist(id);
    return this.removeResult(result, 'Album');
  }
}
