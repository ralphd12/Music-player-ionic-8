import { Routes } from '@angular/router';

export const children_routes: Routes =[
    {
      path:'home',
      loadComponent: () => import('./home/home.page').then( m  => m.HomePage),
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
      path: 'apropos',
      loadComponent: () => import('./apropos/apropos.page').then( m => m.AproposPage)
    },
    {
      path: 'artiste',
      loadComponent: () => import('./artiste/artiste.page').then( m => m.ArtistePage)
    }
]
