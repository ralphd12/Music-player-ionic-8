export interface Album {
  id: number;
  artiste: string;
  nom_album: string;
  image: string;
}

export interface Musique {
  id: number;
  albumId: number;
  title: string;
  artistName: string;
  category: string;
}
