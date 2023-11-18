import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { Toaster } from 'ngx-toast-notifications';

@Injectable()
export class ConfirmationSubcriptionInterceptor implements HttpInterceptor {

  constructor(
    public authService: AuthService,
    public toaster: Toaster,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        console.log(response);
        if(response.status == 403){
          if(response.error && response.error.type && response.error.type == 'INACTIVO'){
            this.toaster.open({text: response.error.error, type: 'danger'});
            setTimeout(() => {
              this.authService.logout();
            }, 500);
          }
        }
        // this.logout()
        return throwError(response);
      })
    );
  }
}
