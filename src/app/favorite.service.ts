import { Injectable } from "@angular/core";

export interface Musique {
  id: number;
  albumId: number;
  artistName: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Musique[] = [];  // Assurez-vous que favorites est typé

  constructor() { }

  addFavorite(song: Musique) {
    if (!this.favorites.includes(song)) {
      this.favorites.push(song);
      localStorage.setItem('favoris', JSON.stringify(song));

    }
  }

  removeFavorite(song: Musique) {
    const index = this.favorites.indexOf(song);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  getFavorites(): Musique[] {
    return [...this.favorites];
  }

  isFavorite(song: Musique): boolean {
    return this.favorites.includes(song);
  }
}
