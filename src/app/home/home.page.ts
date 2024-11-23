import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonLabel, IonItem } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { heartOutline, chevronBackOutline, chevronForwardOutline, add } from "ionicons/icons";
import { AlertController } from '@ionic/angular';
import { NgOptimizedImage } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Swiper} from 'swiper';
import { register } from 'swiper/element/bundle';
import { DataService } from '../data.service';
import { Album } from '../model';
import { Musique } from '../model';
import { RouterModule,Router } from '@angular/router'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgOptimizedImage, IonItem, IonLabel, IonCardContent,
    IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard,
     IonIcon, IonButton, IonContent],
})
export class HomePage  implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  albums_application: any[] = [];
  fonds= ["mbole.jpeg","bikutsi.jpg","kossa.webp","sikin.jpg","fond5.png"];

  constructor(private alertCtrl: AlertController,private dataService: DataService,private router:Router) {
      addIcons({chevronBackOutline,chevronForwardOutline,add,heartOutline});
      register();
  }

  albums: Album[] = [];
  musiques: Musique[] = [];

  mp3Files: string[] = [];

  ngOnInit() {
    this.loadAlbums();
    this.loadMusiques();
    this.readMp3Files();
  }
  private async readMp3Files() {
    try {
      // Liste des fichiers dans le dossier Documents
      const { files } = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents,
      });

      // Filtrer pour obtenir uniquement les fichiers MP3
    const mp3FilesList = files.filter(file => file.name.endsWith('.mp3')); // Utiliser file.name
    this.mp3Files = mp3FilesList.map(file => file.name);

      // Afficher les fichiers MP3 trouvés
      console.log('Fichiers MP3 trouvés :', mp3FilesList);




    } catch (error) {
      console.error('Erreur lors de la lecture des fichiers MP3 :', error);
    }
  }


  loadAlbums() {
    this.dataService.getAlbums().subscribe(data => {
      this.albums = data;
    });
  }

  loadMusiques() {
    this.dataService.getMusiques().subscribe(data => {
      this.musiques = data;
    });
  }
  swiperReady(){
    this.swiper = this.swiperRef?.nativeElement.swiper
  }

  goNext(){
    this.swiper?.slideNext();
    console.log('change');
  }

  goPrev(){
    this.swiper?.slidePrev();
    console.log('change');
  }

  swiperSlideChanged(e:any){
    console.log('changed:',e);
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
    console.log(role);
  }

  scrollLeft() {
    const row = document.querySelector('.populaires') as HTMLElement;
    row.scrollBy({ left: -200, behavior: 'smooth' });
  }
  
  scrollRight() {
    const row = document.querySelector('.populaires') as HTMLElement;
    row.scrollBy({ left: 200, behavior: 'smooth' });
  }
  
}
