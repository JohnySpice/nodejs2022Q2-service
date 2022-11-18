import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AlbumExists } from 'src/utils';
import { ArtistExists } from 'src/utils';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsUUID()
  @IsOptional()
  @ArtistExists()
  artistId: string | null;
  @IsUUID()
  @IsOptional()
  @AlbumExists()
  albumId: string | null;
  @IsNumber()
  duration: number;
}
