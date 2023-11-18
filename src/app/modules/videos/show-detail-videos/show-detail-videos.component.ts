import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-detail-videos',
  templateUrl: './show-detail-videos.component.html',
  styleUrls: ['./show-detail-videos.component.css']
})
export class ShowDetailVideosComponent {

  slug:any = null;

  constructor(
    public activedRoute: ActivatedRoute,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRoute.params.subscribe((resp:any) => {
      this.slug = resp.slug;
    })
  }
  
}
