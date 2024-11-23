import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from "ionicons";
import {NativeAudio} from '@capacitor-community/native-audio'
import { heartOutline, chevronBackOutline, chevronForwardOutline, add, play, pause, stop, playBack, playForward } from "ionicons/icons";
import { IonContent, IonHeader, IonTitle, IonToolbar,IonCard, IonImg, IonItem, IonLabel, IonBackButton, IonRange, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { RouterModule,Router } from '@angular/router'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { DataService } from '../data.service';
import { Album } from '../model';
import { Musique } from '../model';

@Component({
  selector: 'app-lire-musique',
  templateUrl: './lire-musique.page.html',
  styleUrls: ['./lire-musique.page.scss'],
  standalone: true,
  imports: [IonButtons, IonIcon, IonButton, IonRange, IonBackButton, IonLabel, IonItem, IonImg, IonContent, IonHeader, IonTitle,IonCard, IonToolbar, CommonModule, FormsModule]
})
export class LireMusiquePage implements OnInit  {
  musique:  any;
  Musiques: Musique[] = [];
  currentIndex: number = 0;
  constructor(private router:Router,private DataService: DataService) {
    addIcons({playBack,pause,stop,playForward,play,chevronForwardOutline,chevronBackOutline,add,heartOutline});
    this.musique=this.router.getCurrentNavigation()?.extras.state?.['musique'];
   }

    async ngOnInit(){
    this.readMp3Files();
    await this.playMusic();
    this.DataService.getMusiques().subscribe(data => {
      this.Musiques = data;
    });
   }
   mp3Files: string[] = [];
   currentAudio: string | null = null;

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
      console.log('Fichiers MP3 trouvés :', this.mp3Files);




    } catch (error) {
      console.error('Erreur lors de la lecture des fichiers MP3 :', error);
    }
  }

  async playMusic(){
    try{

      const fileExists = this.mp3Files.includes(this.musique.title);

      if (fileExists) {
      const convertedPath=`file:///storage/emulated/0/Documents/${this.musique.title}`
      //const convertedPath = Capacitor.convertFileSrc(filePath);
      if (this.currentAudio) {
        await NativeAudio.unload({ assetId: this.currentAudio });
      }


      await NativeAudio.preload({
        assetId: this.musique.title,
        assetPath: convertedPath,
        audioChannelNum:1,
        isUrl:true,
      });

      await NativeAudio.play({
        assetId: this.musique.title,
        time:0.0 }
      );
      console.error('Musique trouvée :');
      this.currentAudio = this.musique.title;
      } else {
        console.error('Musique non trouvée :');
      }

    }catch (error) {
      console.error('Erreur lors de la lecture de la musique :', error);
    }
  }


  async stopMusic() {
    try {
      if (this.currentAudio) {
        await NativeAudio.stop({ assetId: this.currentAudio });
        await NativeAudio.unload({ assetId: this.currentAudio });
        this.currentAudio = null;
        console.log('Lecture arrêtée.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'arrêt de l\'audio :', error);
    }
  }

  nextMusic() {
    if (this.currentIndex < this.Musiques.length - 1) {
      this.currentIndex++;
      const nextMusic = this.Musiques[this.currentIndex];
      this.updateMusicDetails(nextMusic);
    } else {
      console.log('C\'est la dernière musique.');
    }
  }

  previousMusic() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const previousMusic = this.Musiques[this.currentIndex];
      this.updateMusicDetails(previousMusic);
    } else {
      console.log('C\'est la première musique.');
    }
  }

  updateMusicDetails(music:Musique){
    this.musique=music;
    this.playMusic();
  }
}
