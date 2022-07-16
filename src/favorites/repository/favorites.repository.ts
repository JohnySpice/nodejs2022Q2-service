import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesRepository {
  private artists: string[] = [];
  private tracks: string[] = [];
  private albums: string[] = [];

  find() {
    return {
      artistsIds: this.artists,
      albumsIds: this.albums,
      tracksIds: this.tracks,
    };
  }

  removeItem(id: string, items: string[]) {
    const itemId = items.indexOf(id);
    if (itemId === -1) {
      return;
    }
    return items.splice(itemId, 1);
  }

  addTrack(id: string) {
    return this.tracks.push(id);
  }

  removeTrack(id: string) {
    return this.removeItem(id, this.tracks);
  }

  addAlbum(id: string) {
    this.albums.push(id);
  }

  removeAlbum(id: string) {
    return this.removeItem(id, this.albums);
  }

  addArtist(id: string) {
    this.artists.push(id);
  }

  removeArtist(id: string) {
    return this.removeItem(id, this.artists);
  }
}
