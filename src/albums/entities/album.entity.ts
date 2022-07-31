import { Exclude } from 'class-transformer';
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

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToOne(() => Artist, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  artistId: string | null;

  @ManyToOne(() => Favorite, (favorite) => favorite.artists, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  favorite: Favorite;
}
