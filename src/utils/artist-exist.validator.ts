import { Injectable } from '@nestjs/common';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ArtistsService } from 'src/artists/artists.service';

@ValidatorConstraint({ name: 'ArtistExists', async: true })
@Injectable()
export class ArtistExistsRule implements ValidatorConstraintInterface {
  constructor(private artistService: ArtistsService) {}

  async validate(id: string) {
    const artist = this.artistService.findOne(id);
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
