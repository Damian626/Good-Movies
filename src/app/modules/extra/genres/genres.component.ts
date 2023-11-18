import { Component } from '@angular/core';
import { ExtraService } from '../service/extra.service';

declare var $:any;
declare function INIT_SWIPER([]):any;
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent {

  GENRE_MOVIE:any = [];
  GENRE_TV_SHOW:any = [];
  GENRE_VIDEO:any = [];

  GENRE_MOVIE_STREAMINGS:any = [];
  GENRE_TV_SHOW_STREAMINGS:any = [];
  GENRE_VIDEO_STREAMINGS:any = [];
  constructor(
    public extraService: ExtraService,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.extraService.Genres().subscribe((resp:any) => {
      console.log(resp);
      this.GENRE_MOVIE = resp.genres_movies;
      this.GENRE_TV_SHOW = resp.genres_tv_show;
      this.GENRE_VIDEO = resp.genres_video;
    })
  }

  filterGenres(GENRE_M_ID:number,type:any){
    let data = {
      genre_id: GENRE_M_ID,
    }
    this.GENRE_MOVIE_STREAMINGS = [];
    this.GENRE_TV_SHOW_STREAMINGS = [];
    this.GENRE_VIDEO_STREAMINGS = [];
    this.extraService.Filter_genres(data).subscribe((resp:any) => {
      console.log(resp);

      if(type == 1){
        this.GENRE_MOVIE_STREAMINGS = resp.streamings.data;
      }
      if(type == 2){
        this.GENRE_TV_SHOW_STREAMINGS = resp.streamings.data;
      }
      if(type == 3){
        this.GENRE_VIDEO_STREAMINGS = resp.streamings.data;
      }

      setTimeout(() => {
        INIT_SWIPER($);
      }, 50);
    })
  }
}
