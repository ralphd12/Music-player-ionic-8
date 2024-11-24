import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonIcon,IonLabel,IonItem,IonList,IonThumbnail } from '@ionic/angular/standalone';
import { FavoritesService } from '../favorite.service';
import { Musique } from '../artiste/models';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
  standalone: true,
  // imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
  imports: [IonContent, IonHeader,IonIcon,IonLabel,IonItem,IonList,IonThumbnail, IonTitle, IonToolbar, CommonModule, FormsModule]

})
export class FavorisPage implements OnInit {

  favorites: any[] = []; // Initialisation du tableau de favoris

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    console.log("bonjoutr")
    this.loadFavorites();  // Appeler la méthode pour charger les favoris lors de l'initialisation de la page
  }
  favories:any;
  loadFavorites() {
    const favori = localStorage.getItem('favoris');
    if (favori) {
      this.favories = JSON.parse(favori);
      console.log(this.favories)
    }
    const data: any[] = this.favoritesService.getFavorites(); // Récupérer directement les favoris
    this.favorites = data;  // Assurez-vous que 'data' contient les favoris
    console.log('Favoris chargés:', this.favorites);  // Afficher les données dans la console
  }
  // Retirer un favori
  removeFavorite(song: Musique) {
    this.favoritesService.removeFavorite(song);
    this.favorites = this.favoritesService.getFavorites() as Musique[];  // Mettre à jour la liste
  }

}
