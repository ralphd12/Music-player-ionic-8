import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem,IonList,IonThumbnail, IonLabel,IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { DataService } from '../data.service';
import { RouterModule,Router } from '@angular/router'
import { addIcons } from "ionicons";
import { heartOutline, chevronBackOutline, chevronForwardOutline, add } from "ionicons/icons";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonItem, IonContent, IonHeader, IonTitle, IonToolbar,IonIcon, CommonModule, FormsModule,IonList,IonThumbnail, IonLabel]
})
export class AlbumsPage implements OnInit  {
  albums_application: any[] = [];
  
 
  filteredAlbums = [...this.albums_application]; 
  constructor(private DataService: DataService,private router:Router) {
    addIcons({chevronBackOutline,chevronForwardOutline,add,heartOutline});
   }

  ngOnInit() : void {
    this.DataService.getAlbums().subscribe(data => {
      this.albums_application = data;
    });
  }

  filterAlbums(event: any) {
    const searchTerm = event.target.value.toLowerCase(); // Récupérer la valeur saisie
    if (searchTerm.trim() === '') {
      // Si la barre de recherche est vide, affichez tous les albums
      this.filteredAlbums = [...this.albums_application];
    } else {
      // Filtrez les albums en fonction du terme de recherche
      this.filteredAlbums = this.albums_application.filter(album =>
        album.artistName.toLowerCase().includes(searchTerm) || 
        album.albumName.toLowerCase().includes(searchTerm)
      );
  }
}

toggleFavorite(album: any) {
  album.favorite = !album.favorite;
}
  
  selectionAlbum(album: any){
    this.router.navigate(['onglets/artiste/'],{state: {album}});
 }

}
