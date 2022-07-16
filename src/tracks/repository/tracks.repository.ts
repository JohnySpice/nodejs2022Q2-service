import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../entities/track.entity';

@Injectable()
export class TracksRepository {
  private _storage: Track[] = [];

  private _findById(id: string) {
    return this._storage.findIndex((track) => track.id === id);
  }
  find(): Track[] {
    return this._storage;
  }

  findById(id: string): Track {
    return this._storage[this._findById(id)];
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = new Track(createTrackDto);
    this._storage.push(newTrack);
    return newTrack;
  }

  findByIdAndUpdate(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this._storage[this._findById(id)];
    if (!track) {
      return;
    }
    for (const field in updateTrackDto) {
      if (field in track) {
        track[field] = updateTrackDto[field];
      }
    }
    return track;
  }

  deleteOne(id: string) {
    const trackObjectId = this._findById(id);
    if (trackObjectId === -1) {
      return;
    }
    return this._storage.splice(trackObjectId, 1);
  }

  removeArtist(id: string) {
    const tracks = this._storage.filter((track) => track.artistId === id);
    if (!tracks.length) {
      return;
    }
    for (const track of tracks) {
      track.artistId = null;
    }
    return tracks;
  }
}
