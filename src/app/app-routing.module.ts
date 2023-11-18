import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/service/auth.guard';

// localhost:4200/AUTH/
export const routes: Routes = [
  {
    path: '',
    // 
    loadChildren: () => import("./modules/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },
  // 
  {
    path: 'movie',
    canActivate: [AuthGuard],
    loadChildren: () => import("./modules/movies/movies.module").then((m) => m.MoviesModule),
  },
  {
    path: 'tv-show',
    canActivate: [AuthGuard],
    loadChildren: () => import("./modules/tv-shows/tv-shows.module").then((m) => m.TvShowsModule),
  },
  {
    path: 'video',
    canActivate: [AuthGuard],
    loadChildren: () => import("./modules/videos/videos.module").then((m) => m.VideosModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import("./modules/extra/extra.module").then((m) => m.ExtraModule),
  },
  // 
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
