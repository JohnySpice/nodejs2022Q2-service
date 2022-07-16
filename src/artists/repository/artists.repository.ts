import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistsRepository {
  private _storage: Artist[] = [];

  _findById(id: string) {
    return this._storage.findIndex((artist) => artist.id === id);
  }
  find(): Artist[] {
    return this._storage;
  }

  findById(id: string): Artist {
    return this._storage[this._findById(id)];
  }

  create(createUserDto: CreateArtistDto): Artist {
    const newArtist = new Artist(createUserDto);
    this._storage.push(newArtist);
    return newArtist;
  }

  findByIdAndUpdate(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this._storage[this._findById(id)];
    if (!artist) {
      return;
    }
    for (const field in updateArtistDto) {
      if (field in artist) {
        artist[field] = updateArtistDto[field];
      }
    }
    return artist;
  }

  deleteOne(id: string) {
    const artistObjectId = this._findById(id);
    if (artistObjectId === -1) {
      return;
    }
    return this._storage.splice(artistObjectId, 1);
  }
}
