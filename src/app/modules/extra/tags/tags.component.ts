import { Component } from '@angular/core';
import { ExtraService } from '../service/extra.service';

declare var $:any;
declare function INIT_SWIPER([]):any;
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  
  TAG_MOVIE:any = [];
  TAG_TV_SHOW:any = [];
  TAG_VIDEO:any = [];

  TAGS_MOVIE_STREAMINGS:any = [];
  TAGS_TV_SHOW_STREAMINGS:any = [];
  TAGS_VIDEO_STREAMINGS:any = [];
  constructor(
    public extraService: ExtraService,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.extraService.Tags().subscribe((resp:any) => {
      console.log(resp);
      this.TAG_MOVIE = resp.tags_movies;
      this.TAG_TV_SHOW = resp.tags_tv_show;
      this.TAG_VIDEO = resp.tags_video;
    })
  }

  filterTags(TAG_ID:number,type:any){
    let data = {
      tag_id: TAG_ID,
    }
    this.TAGS_MOVIE_STREAMINGS = [];
    this.TAGS_TV_SHOW_STREAMINGS = [];
    this.TAGS_VIDEO_STREAMINGS = [];
    this.extraService.Filter_tags(data).subscribe((resp:any) => {
      console.log(resp);

      if(type == 1){
        this.TAGS_MOVIE_STREAMINGS = resp.streamings.data;
      }
      if(type == 2){
        this.TAGS_TV_SHOW_STREAMINGS = resp.streamings.data;
      }
      if(type == 3){
        this.TAGS_VIDEO_STREAMINGS = resp.streamings.data;
      }

      setTimeout(() => {
        INIT_SWIPER($);
      }, 50);
    })
  }
}
