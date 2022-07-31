import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = this.tracksRepository.create(createTrackDto);
    return this.tracksRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.find({ loadRelationIds: true });
  }

  async findOne(id: string): Promise<Track> {
    return this.tracksRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track: Track = await this.findOne(id);
    if (!track) {
      return track;
    }
    await this.tracksRepository.save({
      id: id,
      ...updateTrackDto,
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.tracksRepository.delete({ id });
    return result.affected ? result.raw : null;
  }
}
