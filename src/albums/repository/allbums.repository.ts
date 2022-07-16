import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/album.entity';

@Injectable()
export class AlbumsRepository {
  private _storage: Album[] = [];

  private _findById(id: string) {
    return this._storage.findIndex((album) => album.id === id);
  }
  find(): Album[] {
    return this._storage;
  }

  findById(id: string): Album {
    return this._storage[this._findById(id)];
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = new Album(createAlbumDto);
    this._storage.push(newAlbum);
    return newAlbum;
  }

  findByIdAndUpdate(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this._storage[this._findById(id)];
    if (!album) {
      return;
    }
    for (const field in updateAlbumDto) {
      if (field in album) {
        album[field] = updateAlbumDto[field];
      }
    }
    return album;
  }

  deleteOne(id: string) {
    const albumObjectId = this._findById(id);
    if (albumObjectId === -1) {
      return;
    }
    return this._storage.splice(albumObjectId, 1);
  }
}
