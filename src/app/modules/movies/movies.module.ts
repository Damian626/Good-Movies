import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowDetailMoviesComponent } from './show-detail-movies/show-detail-movies.component';
import { HomeMoviesComponent } from './home-movies/home-movies.component';


@NgModule({
  declarations: [
    MoviesComponent,
    ShowDetailMoviesComponent,
    HomeMoviesComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class MoviesModule { }
