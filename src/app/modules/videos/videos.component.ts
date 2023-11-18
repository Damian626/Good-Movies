import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { AuthService } from '../auth/service/auth.service';

declare var $:any;
declare function HOME_INIT([]):any;
declare function INIT_SWIPER([]):any;
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {

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
        if(this.authService.user.subcription.name_plan == 'PREMIUM'){
          //PUEDAS ACCEDER
        }else{
          this.router.navigateByUrl("/");
          this.toaster.open({text: 'NO TIENES EL PERFIL PARA PODER ACCEDER A VIDEOS',type: 'warning'});
        }
      }else{
        this.router.navigateByUrl("/");
      }

      // this.authService.demo().subscribe((resp:any) => {
      //   console.log(resp);
      // })
      
  }
}
