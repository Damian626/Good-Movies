import { Component } from '@angular/core';
import { VideoService } from '../service/video.service';

declare var $:any;
declare function HOME_INIT([]):any;
declare function INIT_SWIPER([]):any;

@Component({
  selector: 'app-home-videos',
  templateUrl: './home-videos.component.html',
  styleUrls: ['./home-videos.component.css']
})
export class HomeVideosComponent {

  SLIDERS:any = [];
  LAST_MOVIE_A:any = [];
  LAST_MOVIE_B:any = [];
  LAST_MOVIE_C:any = [];
  constructor(
    public videosService: VideoService,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.videosService.homeVideos().subscribe((resp:any) => {
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
