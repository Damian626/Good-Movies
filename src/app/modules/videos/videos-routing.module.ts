import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos.component';
import { ShowDetailVideosComponent } from './show-detail-videos/show-detail-videos.component';
import { HomeVideosComponent } from './home-videos/home-videos.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent,
    children: [
      {
        path: '',
        component: HomeVideosComponent,       
      },
      {
        path: 'ver-video/:slug',
        component: ShowDetailVideosComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
