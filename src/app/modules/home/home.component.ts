import { Component } from '@angular/core';
import { HomeService } from './service/home.service';
import { Router } from '@angular/router';

declare var $:any;
declare function HOME_INIT([]):any;
declare function INIT_SWIPER([]):any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  SLIDER_HOME:any = [];
  LAST_MOVIES:any = [];
  LAST_VIDEOS:any = [];
  TOP_10_HOME:any = [];

  LAST_TV_SHOW:any = [];
  MOVIE_SELECTED:any = null;

  TV_SHOW_SECTION_SPECIAL:any = [];
  constructor(
    public HomeService: HomeService,
    public router: Router,
  ) {
    
  }
  ngOnInit(): void {

    this.HomeService.HomeStreaming().subscribe((resp:any) => {
      console.log(resp);
      this.SLIDER_HOME = resp.slider_home.data;
      this.LAST_MOVIES= resp.last_movies.data;
      this.LAST_VIDEOS= resp.last_videos.data;
      this.TOP_10_HOME = resp.top_10_home.data;

      this.LAST_TV_SHOW = resp.last_tv_show.data;
      this.MOVIE_SELECTED = resp.movie_selected;

      this.TV_SHOW_SECTION_SPECIAL = resp.tv_show_section_special;

      setTimeout(() => {
        HOME_INIT($);
        INIT_SWIPER($);
      }, 50);

    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  toUrl(STREAMING_G:any){
    if(STREAMING_G.type == 1){
      this.router.navigateByUrl("/movie/ver-pelicula/"+STREAMING_G.slug);
    }
    if(STREAMING_G.type == 2){
      this.router.navigateByUrl("/tv-show/ver-series/"+STREAMING_G.slug);
    }
    if(STREAMING_G.type == 3){
      this.router.navigateByUrl("/video/ver-video/"+STREAMING_G.slug);
    }
  }
}
