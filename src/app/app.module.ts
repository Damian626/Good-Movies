import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { ConfirmationSubcriptionInterceptor } from './config/interceptor/confirmation-subcription.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    BrowserAnimationsModule,

    ToastNotificationsModule.forRoot({duration: 6000, type: 'primary',position: 'top-right'}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ConfirmationSubcriptionInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
