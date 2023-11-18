import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Toaster } from 'ngx-toast-notifications';
import { HomeService } from 'src/app/modules/home/service/home.service';
import { MoviesService } from 'src/app/modules/movies/service/movies.service';

declare var $:any;
declare function VIDEO_POPUP():any;
@Component({
  selector: 'app-show-detail-general',
  templateUrl: './show-detail-general.component.html',
  styleUrls: ['./show-detail-general.component.css']
})
export class ShowDetailGeneralComponent {

  @Input() slug:any = null;

  STREAMING_SELECTED:any = null;
  SEASON_SELECTED:any = null;
  INDEX_SEASON:any = 0;

  SHOW_CONTENT:any = null;

  RATING:number = 0;
  DESCRIPTION_REVIEW:any = null;
  IS_HAVE_REVIEW:boolean = false;
  constructor(
    public movieService: MoviesService,
    public sanitizer: DomSanitizer,
    public toaster: Toaster,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.movieService.showStreaming(this.slug).subscribe((resp:any) => {
      console.log(resp);
      this.STREAMING_SELECTED = resp.streaming;
      if(this.STREAMING_SELECTED.type == 2){
        this.SEASON_SELECTED = this.STREAMING_SELECTED.seasons[0];
      }
      this.IS_HAVE_REVIEW = resp.is_hava_review;
      setTimeout(() => {
        VIDEO_POPUP();
      }, 50);
    })
  }

  changeSeason(target:any){
    console.log(target.value);
    this.SEASON_SELECTED = null;
    setTimeout(() => {
      this.SEASON_SELECTED = this.STREAMING_SELECTED.seasons.find((item:any) => item.id == target.value);
      this.INDEX_SEASON =  this.STREAMING_SELECTED.seasons.findIndex((item:any) => item.id == target.value);
    }, 50);
  }

  showContent(episode = null){
    if(this.STREAMING_SELECTED.type == 2){//SERIES
      if(episode){
        this.SHOW_CONTENT = episode;
      }else{
        this.SHOW_CONTENT = this.STREAMING_SELECTED.seasons[0].episodes[0];
      }
    }else{
      this.SHOW_CONTENT = this.STREAMING_SELECTED;
    }
    setTimeout(() => {
      VIDEO_POPUP();
    }, 50);
  }

  urlGetVideoContenido(){
    if(this.STREAMING_SELECTED.type == 2){
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.SHOW_CONTENT.vimeo_id);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.SHOW_CONTENT.vimeo_contenido_id);
  }
  selectedRating(val:number){
    this.RATING = val;
  }
  saveReview(){
    if(this.RATING == 0){
      this.toaster.open({text: 'NECESITAS SELECCIONAR UNA CALIFICACIÓN',type: 'danger'});
      return;
    }
    if(!this.DESCRIPTION_REVIEW){
      this.toaster.open({text: 'NECESITAS INGRESAR UNA DESCRIPCIÓN',type: 'danger'});
      return;
    }
    let data = {
      rating: this.RATING,
      description: this.DESCRIPTION_REVIEW,
      streaming_id: this.STREAMING_SELECTED.id,
    }
    this.movieService.storeReview(data).subscribe((resp:any) => {
      console.log(resp);
      this.toaster.open({text: 'Tu calificación ha sido exitosa',type: 'success'});
      this.IS_HAVE_REVIEW = true;
    })
  }
}
