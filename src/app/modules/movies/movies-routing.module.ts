import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { ShowDetailMoviesComponent } from './show-detail-movies/show-detail-movies.component';
import { HomeMoviesComponent } from './home-movies/home-movies.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: '',
        component: HomeMoviesComponent
      },
      {
        path: 'ver-pelicula/:slug',
        component: ShowDetailMoviesComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
