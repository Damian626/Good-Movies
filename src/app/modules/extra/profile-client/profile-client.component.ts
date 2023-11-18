import { Component } from '@angular/core';
import { ExtraService } from '../service/extra.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent {

  USER_AUTH:any = null;
  user:any = null;
  IS_UPDATE_PROFILE:boolean = false;
  IS_WANT_CANCELLED:boolean = false;

  name:any = null;
  surname:any = null;
  email:any = null;
  date_birth:any = null;

  reason:any = null;
  constructor(
    public extraService:ExtraService,
    public toaster: Toaster,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.user = this.extraService.authService.user;
    this.extraService.getProfileCliente().subscribe((resp:any) => {
      console.log(resp);
      this.USER_AUTH = resp.user;
      this.name = this.USER_AUTH.name;
      this.surname = this.USER_AUTH.surname;
      this.email = this.USER_AUTH.email;
      this.date_birth = this.USER_AUTH.date_birth;
    })
  }

  openProfile(){
    this.IS_UPDATE_PROFILE = !this.IS_UPDATE_PROFILE;
  }

  updateProfile(){

    if(!this.name || !this.surname || !this.email) {
      this.toaster.open({text: 'SE NECESITA TODOS LOS CAMPOS',type: 'danger'});
      return;
    }

    let data = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      date_birth: this.date_birth,
    }

    this.extraService.ProfileCliente(data).subscribe((resp:any) => {
      console.log(resp);
      localStorage.setItem("user",JSON.stringify(resp.user));
      this.toaster.open({text: 'EL USUARIO SE ACABA DE REGISTRAR CORRECTAMENTE',type: 'success'});
      this.openProfile();
    })
  }

  cancelSubcription(){
    this.IS_WANT_CANCELLED = !this.IS_WANT_CANCELLED;
  }

  cancel(){
    let data = {
      reason: this.reason,
      subcription_id: this.user.subcription.id,
    }
    this.extraService.CancelledSubcription(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: 'HUBO UN ERROR INTENTELO MAS TARDE', type: 'danger'});
      }else{
        this.toaster.open({text: 'LA CANCELACIÓN HA SIDO EXITOSA', type: 'success'});
        this.cancelSubcription();
        // this.extraService.authService.logout();
      }
    })
  }
}
