import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumsRepository: Repository<Album>,
  ) { }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumsRepository.create(createAlbumDto);
    return this.albumsRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find({ loadRelationIds: true });
  }

  async findOne(id: string): Promise<Album> {
    return this.albumsRepository.findOne({ where: { id }, loadRelationIds: true });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album: Album = await this.findOne(id);
    if (!album) {
      return album;
    }
    await this.albumsRepository.save({
      id: id,
      ...updateAlbumDto,
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.albumsRepository.delete({ id });
    return result.affected ? result.raw : null;
  }
}
