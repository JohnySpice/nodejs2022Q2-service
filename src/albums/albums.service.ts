import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumsRepository } from './repository/allbums.repository';

@Injectable()
export class AlbumsService {
  constructor(private albumsRepository: AlbumsRepository) {}
  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsRepository.create(createAlbumDto);
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    return this.albumsRepository.findById(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return this.albumsRepository.findByIdAndUpdate(id, updateAlbumDto);
  }

  async remove(id: string) {
    return this.albumsRepository.deleteOne(id);
  }
}
