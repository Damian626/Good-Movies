import { Component } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { Router } from '@angular/router';

declare var $:any;
declare function HOME_INIT([]):any;
declare function INIT_SWIPER([]):any;
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      HOME_INIT($);
      INIT_SWIPER($);
    }, 50);

      if(this.authService.user){
        if(this.authService.user.subcription.name_plan == 'STANDARS' ||
        this.authService.user.subcription.name_plan == 'BASICO'
        || this.authService.user.subcription.name_plan == 'BASICO 2' ||
        this.authService.user.subcription.name_plan == 'BASICO 3'
        || this.authService.user.subcription.name_plan == 'PREMIUM'){
          //PUEDAS ACCEDER
        }
      }else{
        this.router.navigateByUrl("/");
      }

      // this.authService.demo().subscribe((resp:any) => {
      //   console.log(resp);
      // })
  }
}
