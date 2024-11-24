import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonList, IonTitle,IonLabel,IonIcon,IonItem, IonToolbar,IonCard,IonCardHeader,IonCardTitle,IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.page.html',
  styleUrls: ['./apropos.page.scss'],
  standalone: true,
  imports: [IonContent,IonList, IonHeader,IonLabel,IonIcon,IonItem,IonList,IonCard,IonCardHeader,IonCardTitle,IonCardContent, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AproposPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
