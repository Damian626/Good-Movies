import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Toaster } from 'ngx-toast-notifications';

declare var paypal:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name:string = '';
  surname:string = '';
  email:string = '';
  password:string = '';
  password_confirmation:string = '';

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
          new_password: this.password,
          email: this.email,
          name : this.name,
          surname: this.surname,
          plan_paypal_id: this.plan_paypal_id,
          paypal_plan_id: this.plan_paypal_selected,
          type_plan: this.type_plan,
          subcription_paypal_id:  data.subscriptionID,
          type_user: 2,
        };
        this.AuthService.register(dataP).subscribe((resp:any) => {
          console.log(resp);
          this.AuthService.router.navigateByUrl("/auth/login");
          this.toaster.open({caption: 'NOTIFICACIÓN',text: "EL REGISTRO HA SIDO EXITOSA",type: 'success'});
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
  SignUp(){
    if(!this.email || !this.name || !this.surname || !this.password || !this.password_confirmation){
      this.toaster.open({caption: 'VALIDACIÓN',text: 'NECESITAS INGRESAR TODOS LOS CAMPOS',type: 'danger'});
      return;
    }
    if(this.password != this.password_confirmation){
      this.toaster.open({caption: 'VALIDACIÓN',text: 'NECESITAS INGRESAR CONTRASEÑAS IGUALES',type: 'danger'});
      return;
    }
    this.AuthService.ValidEmail(this.email).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.SigInUp = false;
        // alert(resp.message_text);
        this.toaster.open({caption: 'VALIDACIÓN',text: resp.message_text,type: 'danger'});
        return;
      }else{
        this.SigInUp = true;
        // alert(resp.message_text);
        this.toaster.open({caption: 'VALIDACIÓN',text: resp.message_text,type: 'success'});
      }
    })
    
  }
}
