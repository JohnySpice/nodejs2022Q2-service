import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity('favorites')
export class Favorite {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Artist, (artist) => artist.favorite)
  artists: Artist[];

  @OneToMany(() => Album, (album) => album.favorite)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.favorite)
  tracks: Track[];
}
