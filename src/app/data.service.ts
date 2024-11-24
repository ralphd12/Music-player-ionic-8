import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../app/model';
import { Musique } from '../app/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private albumsUrl = 'assets/data/albums.json';
  private musiquesUrl = 'assets/data/musics.json';

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl);
  }

  getMusiques(): Observable<Musique[]> {
    return this.http.get<Musique[]>(this.musiquesUrl);
  }
  
}
