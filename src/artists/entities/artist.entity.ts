import { Exclude } from 'class-transformer';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @ManyToOne(() => Favorite, (favorite) => favorite.artists, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  favorite: Favorite;
}
