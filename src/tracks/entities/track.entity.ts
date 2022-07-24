import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn()
  artistId: string | null;

  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn()
  albumId: string | null;

  @Column()
  duration: number;
}
