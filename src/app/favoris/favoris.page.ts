import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonSkeletonText, IonTitle, IonToolbar,IonIcon,IonLabel,IonItem,IonList,IonThumbnail } from '@ionic/angular/standalone';
import { FavoritesService } from '../favorite.service';
import { Musique } from '../album-details/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
  standalone: true,
  // imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
  imports: [IonContent,IonSkeletonText, IonHeader,IonIcon,IonLabel,IonItem,IonList,IonThumbnail, IonTitle, IonToolbar, CommonModule, FormsModule]

})
export class FavorisPage implements OnInit {
  isLoading:any;
  favorites: any[] = []; // Initialisation du tableau de favoris

  constructor(private favoritesService: FavoritesService,private router:Router) {}
  isPageRefreshed: boolean = false; // Drapeau pour vérifier si la page a été rafraîchie

  ngOnInit() {
    this.loadFavorites();  
    this.refreshPage();
  }
  intervalId: any; // ID du setInterval
  refreshPage() {
    this.intervalId = setInterval(() => {
      this.loadFavorites(); // Recharge uniquement les données
      console.log('Données rechargées automatiquement');
    }, 5000); // 5000 ms = 5 secondes 
  }

  selectionMusique(musique: any){
    this.router.navigate(['lire-musique/'],{state: {musique}});
  }
  favories:any;
  loadFavorites() {
    const favori = localStorage.getItem('favorites');
    if (favori) {
      this.favories = JSON.parse(favori);
      console.log(this.favories)
    }
    // Afficher les favoris du localStorage
    this.favorites = this.favories;  // Mettre à jour 'favorites' avec les éléments du localStorage
    console.log('Favoris chargés:', this.favorites);  // Afficher les données dans la console
  }
  // Retirer un favori
  removeFavorite(song: Musique) {
    this.favoritesService.removeFavorite(song);
    this.favorites = this.favoritesService.getFavorites() as Musique[];  // Mettre à jour la liste
  }

}
