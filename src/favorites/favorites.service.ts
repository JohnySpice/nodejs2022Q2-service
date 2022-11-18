import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private _id: string;
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {
    this.init();
  }

  async init() {
    const record = await this.favoritesRepository.find();
    if (record.length) {
      this._id = record[0].id;
      return;
    }

    const favorite = this.favoritesRepository.create();
    await this.favoritesRepository.save(favorite);
    return;
  }

  async getAll(): Promise<Favorite> {
    const favorite = await this.favoritesRepository.findOne({
      where: { id: this._id },
      relations: {
        artists: true,
        tracks: true,
        albums: true,
      },
    });
    return favorite;
  }

  async getAllFormated() {
    const favorite: any = await this.getAll();
    favorite.albums.forEach((a) => (a.artistId = a.artistId?.id ?? null));
    favorite.tracks.forEach(
      (t) => (
        (t.artistId = t.artistId?.id ?? null),
        (t.albumId = t.albumId?.id ?? null)
      ),
    );
    return favorite;
  }

  async addToFavorite(type: string, entity) {
    const fav = await this.getAll();
    fav[type].push(entity);
    const result = await this.favoritesRepository.save(fav);
    if (result) {
      return { message: `${type} added to favorite` };
    }
  }

  async removeFromFavorite(type: string, id: number) {
    const fav = await this.getAll();
    fav[type].splice(id, 1);
    return this.favoritesRepository.save(fav);
  }

  async addTrack(track: Track) {
    return this.addToFavorite('tracks', track);
  }

  async removeTrack(id: number) {
    return this.removeFromFavorite('tracks', id);
  }

  async addAlbum(album: Album) {
    return this.addToFavorite('albums', album);
  }

  async removeAlbum(id: number) {
    return this.removeFromFavorite('albums', id);
  }

  async addArtist(artist: Artist) {
    return this.addToFavorite('artists', artist);
  }

  async removeArtist(id: number) {
    return this.removeFromFavorite('artists', id);
  }
}
