import { v4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;
  constructor({ name, grammy }: CreateArtistDto) {
    this.id = v4();
    this.name = name;
    this.grammy = grammy;
  }
}
