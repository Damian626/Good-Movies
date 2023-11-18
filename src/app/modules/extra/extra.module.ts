import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraRoutingModule } from './extra-routing.module';
import { ExtraComponent } from './extra.component';
import { GenresComponent } from './genres/genres.component';
import { TagsComponent } from './tags/tags.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileClientComponent } from './profile-client/profile-client.component';


@NgModule({
  declarations: [
    ExtraComponent,
    GenresComponent,
    TagsComponent,
    ProfileClientComponent
  ],
  imports: [
    CommonModule,
    ExtraRoutingModule,

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class ExtraModule { }
