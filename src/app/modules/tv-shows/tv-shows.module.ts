import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsComponent } from './tv-shows.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowDetailTvShowsComponent } from './show-detail-tv-shows/show-detail-tv-shows.component';
import { HomeTvShowsComponent } from './home-tv-shows/home-tv-shows.component';


@NgModule({
  declarations: [
    TvShowsComponent,
    ShowDetailTvShowsComponent,
    HomeTvShowsComponent
  ],
  imports: [
    CommonModule,
    TvShowsRoutingModule,

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class TvShowsModule { }
