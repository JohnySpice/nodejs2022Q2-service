import { Inject, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ArtistsRepository } from 'src/artists/repository/artists.repository';

@ValidatorConstraint({ name: 'ArtistExists', async: true })
@Injectable()
export class ArtistExistsRule implements ValidatorConstraintInterface {
  constructor(
    @Inject(ArtistsRepository) private artistsRepository: ArtistsRepository,
  ) {}

  async validate(id: string) {
    const artist = this.artistsRepository.findById(id);
    if (!artist) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return `Artist doesn't exist`;
  }
}

export function ArtistExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ArtistExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ArtistExistsRule,
    });
  };
}
