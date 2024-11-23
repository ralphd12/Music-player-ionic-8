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
  constructor(private DataService: DataService,private router:Router) {
    this.album=this.router.getCurrentNavigation()?.extras.state?.['album'];
    addIcons({heart,chevronBackOutline,chevronForwardOutline,add,heartOutline});
   }

   ngOnInit() : void {
    this.DataService.getMusiques().subscribe(data => {
      this.Musiques = data;
    });
  }

  selectionMusique(musique: any){
    this.router.navigate(['lire-musique/'],{state: {musique}});
 }

}
