import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar ,IonBackButton,IonButtons, IonList, IonSearchbar, IonItem  ,IonThumbnail, IonLabel,IonIcon, IonButton } from '@ionic/angular/standalone';
import { RouterModule,Router } from '@angular/router'
import { DataService } from '../data.service';
import { Album } from '../model';
import { Musique } from '../model';
import { addIcons } from "ionicons";
import { heartOutline, chevronBackOutline, chevronForwardOutline, add,heart } from "ionicons/icons";
import { FavoritesService } from '../favorite.service';

@Component({
  selector: 'app-artiste',
  templateUrl: './artiste.page.html',
  styleUrls: ['./artiste.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonSearchbar, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,IonIcon, FormsModule,IonBackButton,IonButtons,IonThumbnail, IonLabel]
})
export class ArtistePage implements OnInit  {
  album:  any;
  Musiques: Musique[] = [];
  searchText = '';  // Texte saisi par l'utilisateur
  filteredItems = this.Musiques;  // Liste filtrée à afficher
  favorites: Musique[] = [];
  constructor(private DataService: DataService,private router:Router,private favoritesService: FavoritesService) {
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    this.favorites = this.favoritesService.getFavorites().map(fav => ({
      ...fav,
      category: 'favorite' // Ajouter la propriété manquante 'category' avec une valeur par défaut
    }));  // Récupérer les favoris et ajouter la propriété 'category' manquante
    // this.album = this.router.getCurrentNavigation()?.extras.state?.['album'] || {}; // Sélectionner l'élément actuel dans le state
    const storedAlbum = localStorage.getItem('selectedAlbum'); // Récupérer l'album du localStorage
    this.album = storedAlbum ? JSON.parse(storedAlbum) : {};
    console.log(this.album)
    addIcons({heart,chevronBackOutline,chevronForwardOutline,add,heartOutline});
   }
   private saveFavoritesToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
   }
   toggleFavorite(item: Musique) {
    if (this.favoritesService.isFavorite(item)) {
      this.favoritesService.removeFavorite(item);  // Retirer des favoris
      this.favorites = this.favorites.filter(fav => fav.id !== item.id); // Mettre à jour le tableau des favoris
    } else {
      this.favoritesService.addFavorite(item);  // Ajouter aux favoris
      this.favorites.push(item); // Ajouter l'élément au tableau des favoris
      this.saveFavoritesToLocalStorage();  // Sauvegarder les favoris après modification
    }
  }

  isFavorite(item: Musique): boolean {
    return this.favoritesService.isFavorite(item);
  }

   ngOnInit() : void {
    console.log("test")
    this.DataService.getMusiques().subscribe(data => {
      this.Musiques = data;
    });
  }

  onSearch() {
    this.filteredItems = this.Musiques.filter(item =>
      item.artistName.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log(this.filteredItems)
  }
  selectionMusique(musique: any){
    this.router.navigate(['lire-musique/'],{state: {musique}});
 }


}
