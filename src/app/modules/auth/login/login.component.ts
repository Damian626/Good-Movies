import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Toaster } from 'ngx-toast-notifications';

declare var paypal:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email:string = '';
  password:string = '';

  SigInUp:boolean = false;
  PLANS:any = [];

  @ViewChild('paypal',{static: true}) paypalElement?: ElementRef;
  plan_paypal_selected:any = null;
  plan_paypal_id:any = null;
  type_plan:any = 1;
  constructor(
    public AuthService: AuthService,
    public toaster: Toaster,
  ) {
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.AuthService.user){
      this.AuthService.router.navigateByUrl("/");
    }

    this.AuthService.config_all().subscribe((resp:any) => {
      console.log(resp);
      this.PLANS = resp.plans;
    })

    paypal.Buttons({
      createSubscription: (data:any, actions:any) => {
        if(!this.plan_paypal_selected){
          return false;
        }
        return actions.subscription.create({
          'plan_id': this.plan_paypal_selected,
        });
      },

      onApprove: (data:any) => {
        console.log(data);
        this.toaster.open({caption: 'NOTIFICACIÓN',text: 'You have successfully created subscription ' + data.subscriptionID,type: 'warning'});
 
        let dataP:any = {
          password: this.password,
          email: this.email,
          plan_paypal_id: this.plan_paypal_id,
          paypal_plan_id: this.plan_paypal_selected,
          type_plan: this.type_plan,
          subcription_paypal_id:  data.subscriptionID,
        };
        this.AuthService.login_streaming_addtional(dataP).subscribe((resp:any) => {
          console.log(resp);
          this.AuthService.router.navigateByUrl("/");
          this.toaster.open({caption: 'NOTIFICACIÓN',text: "LA AUTHENTICACIÓN HA SIDO EXITOSA",type: 'success'});
        })
      }
    }).render(this.paypalElement?.nativeElement);

  }

  selectedPlanMonth(PLAN:any){
    console.log(PLAN);
    this.plan_paypal_selected = PLAN.id_plan_paypal_mensual;
    this.plan_paypal_id = PLAN.id;
    this.type_plan = 1;
    this.toaster.open({caption: 'NOTIFICACIÓN',text: "PLAN "+PLAN.name + " DE TIPO MENSUAL SE HA SELECCIONADO" ,type: 'warning'});
  }
  selectedPlanAnual(PLAN:any){
    console.log(PLAN);
    this.plan_paypal_selected = PLAN.id_plan_paypal_anual;
    this.plan_paypal_id = PLAN.id;
    this.type_plan = 2;
    this.toaster.open({caption: 'NOTIFICACIÓN',text: "PLAN "+PLAN.name + " DE TIPO ANUAL SE HA SELECCIONADO" ,type: 'warning'});
  }

  login(){
    if(!this.email){
      this.toaster.open({caption: 'NOTIFICACIÓN',text: "NECESITAS DIGITAR UN CORREO ELECTRONICO",type: 'warning'});
      return;
    }
    if(!this.password){
      this.toaster.open({caption: 'NOTIFICACIÓN',text: "NECESITAS DIGITAR UNa contraseña",type: 'warning'});
      return;
    }
    this.AuthService.login_streaming(this.email,this.password).subscribe((resp:any) => {
      console.log(resp);
      if(resp && (resp.message == 403 || resp.message == 405)){
        if(resp.message == 403){
          this.SigInUp = false;
        }
        
        if(resp.message == 405){
          this.SigInUp = true;
        }
        this.toaster.open({caption: 'NOTIFICACIÓN',text: resp.message_text,type: 'warning'});
      }else{
        if(resp){
          this.AuthService.router.navigateByUrl("/");
          this.toaster.open({caption: 'NOTIFICACIÓN',text: "LA AUTHENTICACIÓN HA SIDO EXITOSA",type: 'success'});
        }else{
          this.toaster.open({caption: 'NOTIFICACIÓN',text: "LAS CREDENCIALES SON INCORRECTAS",type: 'warning'});
        }
      }
      
    })

  }
}
