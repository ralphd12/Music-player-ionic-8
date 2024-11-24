import { Routes } from '@angular/router';
import { children_routes } from './onglets.route';
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'onglets/home',
    pathMatch: 'full',
  },
  {
    path: 'onglets',
    loadComponent: () => import('./onglets/onglets.page').then( m => m.OngletsPage),
    children:children_routes
  },
  {
    path: 'favoris',
    loadComponent: () => import('./favoris/favoris.page').then( m => m.FavorisPage)
  },
  {
    path: 'albums',
    loadComponent: () => import('./albums/albums.page').then( m => m.AlbumsPage)
  },
  {
    path: 'lire-musique',
    loadComponent: () => import('./lecteur/lire-musique.page').then( m => m.LireMusiquePage)
  },
  {
    path: 'apropos',
    loadComponent: () => import('./apropos/apropos.page').then( m => m.AproposPage)
  },
  {
    path: 'artiste',
    loadComponent: () => import('./album-details/artiste.page').then( m => m.ArtistePage)
  },
  {
    path: 'onglets/artiste/:id',
    loadComponent: () => import('./album-details/artiste.page').then( m => m.ArtistePage)
  },
];
