import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvShowsComponent } from './tv-shows.component';
import { ShowDetailTvShowsComponent } from './show-detail-tv-shows/show-detail-tv-shows.component';
import { HomeTvShowsComponent } from './home-tv-shows/home-tv-shows.component';

const routes: Routes = [
  {
    path: '',
    component: TvShowsComponent,
    children: [
      {
        path: '',
        component: HomeTvShowsComponent,
      },
      {
        path: 'ver-series/:slug',
        component: ShowDetailTvShowsComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowsRoutingModule { }
