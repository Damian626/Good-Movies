import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowDetailVideosComponent } from './show-detail-videos/show-detail-videos.component';
import { HomeVideosComponent } from './home-videos/home-videos.component';


@NgModule({
  declarations: [
    VideosComponent,
    ShowDetailVideosComponent,
    HomeVideosComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class VideosModule { }
