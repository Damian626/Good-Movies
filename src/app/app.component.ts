import { Component } from '@angular/core';

declare var $:any;
declare function HOME_INIT([]):any;
declare function INIT_SWIPER([]):any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'streaming_tipo-nexflit';
  constructor(){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // setTimeout(() => {
    //   HOME_INIT($);
    //   INIT_SWIPER($);
    // }, 50);
  }
}
