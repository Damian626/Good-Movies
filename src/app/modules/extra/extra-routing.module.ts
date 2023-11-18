import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtraComponent } from './extra.component';
import { GenresComponent } from './genres/genres.component';
import { TagsComponent } from './tags/tags.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';

const routes: Routes = [
  {
    path: '',
    component: ExtraComponent,
    children: [
      {
        path: 'genres',
        component: GenresComponent,
      },
      {
        path: 'tags',
        component: TagsComponent,
      },
      {
        path: 'profile-client',
        component: ProfileClientComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraRoutingModule { }
