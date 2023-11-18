import { Component } from '@angular/core';

declare var $:any;
declare function HOME_INIT([]):any;
declare function INIT_SWIPER([]):any;
@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css']
})
export class ExtraComponent {

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      HOME_INIT($);
      INIT_SWIPER($);
    }, 50);
  }
}
