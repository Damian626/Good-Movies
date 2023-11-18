import { Component } from '@angular/core';
import { TvShowsService } from '../service/tv-shows.service';

declare var $:any;
declare function HOME_INIT([]):any;
declare function INIT_SWIPER([]):any;

@Component({
  selector: 'app-home-tv-shows',
  templateUrl: './home-tv-shows.component.html',
  styleUrls: ['./home-tv-shows.component.css']
})
export class HomeTvShowsComponent {

  SLIDERS:any = [];
  LAST_MOVIE_A:any = [];
  LAST_MOVIE_B:any = [];
  LAST_MOVIE_C:any = [];
  constructor(
    public tvshowService: TvShowsService,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tvshowService.homeTvShows().subscribe((resp:any) => {
      console.log(resp);
      this.SLIDERS = resp.slider_home.data;
      this.LAST_MOVIE_A = resp.last_movies_a.data;
      this.LAST_MOVIE_B = resp.last_movies_b.data;
      this.LAST_MOVIE_C = resp.last_movies_c.data;
      setTimeout(() => {
        HOME_INIT($);
        INIT_SWIPER($);
      }, 50);
    })
  }

}
