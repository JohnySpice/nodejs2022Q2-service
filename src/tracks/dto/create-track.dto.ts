import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ArtistExists } from 'src/utils/artist-exist.validator';

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
  albumId: string | null;
  @IsNumber()
  duration: number;
}
