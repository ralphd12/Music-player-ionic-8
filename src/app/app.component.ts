import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { Filesystem, Directory } from '@capacitor/filesystem';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    this.readMp3Files(); // Appeler la méthode au démarrage de l'application
  }
  private async readMp3Files() {
    try {
      // Liste des fichiers dans le dossier Documents
      const { files } = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents,
      });

      // Filtrer pour obtenir uniquement les fichiers MP3
    const mp3Files = files.filter(file => file.name.endsWith('.mp3')); // Utiliser file.name

      // Afficher les fichiers MP3 trouvés
      // console.log('Fichiers MP3 trouvés :', mp3Files);




    } catch (error) {
      console.error('Erreur lors de la lecture des fichiers MP3 :', error);
    }
  }

  private playAudio(fileName: string) {
    const filePath = `file://Documents/${fileName}`; // Chemin local du fichier
    const audio = new Audio(filePath);
    audio.play().catch(error => {
      console.error('Erreur lors de la lecture de l\'audio :', error);
    });
  }
}
