import { Component } from '@angular/core';

declare var $:any;
declare function HOME_INIT([]):any;
declare function INIT_SWIPER([]):any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  ngOnInit(): void {
    setTimeout(() => {
      HOME_INIT($);
      INIT_SWIPER($);
    }, 50);
  }
}
