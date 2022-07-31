import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { AlbumsService } from 'src/albums/albums.service';

@ValidatorConstraint({ name: 'AlbumExists', async: true })
@Injectable()
export class AlbumExistsRule implements ValidatorConstraintInterface {
  constructor(private albumService: AlbumsService) {}

  async validate(id: string) {
    const album = await this.albumService.findOne(id);
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
