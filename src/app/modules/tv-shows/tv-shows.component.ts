import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { Toaster } from 'ngx-toast-notifications';

declare var $:any;
declare function HOME_INIT([]):any;
declare function INIT_SWIPER([]):any;
@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent {

  constructor(
    public authService: AuthService,
    public router: Router,
    public toaster: Toaster,
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
        if(this.authService.user.subcription.name_plan == 'STANDARS'
        || this.authService.user.subcription.name_plan == 'PREMIUM'){
          //PUEDAS ACCEDER
        }else{
          this.router.navigateByUrl("/");
          this.toaster.open({text: 'NO TIENES EL PERFIL PARA PODER ACCEDER A TV SHOW',type: 'warning'});
        }
      }else{
        this.router.navigateByUrl("/");
      }

    // this.authService.demo().subscribe((resp:any) => {
    //   console.log(resp);
    // })
  }
}
