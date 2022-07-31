import { Exclude } from 'class-transformer';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Artist, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  artistId: string | null;

  @OneToOne(() => Album, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => Favorite, (favorite) => favorite.artists, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  favorite: Favorite;
}
