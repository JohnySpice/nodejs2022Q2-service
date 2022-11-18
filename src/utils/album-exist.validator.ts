import { Inject, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { AlbumsRepository } from 'src/albums/repository/allbums.repository';

@ValidatorConstraint({ name: 'AlbumExists', async: true })
@Injectable()
export class AlbumExistsRule implements ValidatorConstraintInterface {
  constructor(
    @Inject(AlbumsRepository) private albumsRepository: AlbumsRepository,
  ) {}

  async validate(id: string) {
    const album = this.albumsRepository.findById(id);
    if (!album) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return `Album doesn't exist`;
  }
}

export function AlbumExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'AlbumExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: AlbumExistsRule,
    });
  };
}
