import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from "ionicons";
import { heartOutline, chevronBackOutline, chevronForwardOutline, home, car, informationCircleOutline, musicalNotes } from "ionicons/icons";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabButton, IonIcon, IonLabel, IonTabs,IonTabBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-onglets',
  templateUrl: './onglets.page.html',
  styleUrls: ['./onglets.page.scss'],
  standalone: true,
  imports: [IonTabs, IonLabel, IonIcon, IonTabButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonTabBar]
})
export class OngletsPage  {

  constructor() {
    addIcons({home,musicalNotes,heartOutline,informationCircleOutline,car});
   }



}
