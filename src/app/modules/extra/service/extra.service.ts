import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  Genres(){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/genres";
    return this.http.get(URL,{headers: headers});
  }
  Filter_genres(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/filter_genres";
    return this.http.post(URL,data,{headers: headers});
  }
  Tags(){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/tags";
    return this.http.get(URL,{headers: headers});
  }
  Filter_tags(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/filter_tags";
    return this.http.post(URL,data,{headers: headers});
  }
  // PROFILE CLIENTE 
  getProfileCliente(){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/profile_client";
    return this.http.get(URL,{headers: headers});
  }
  ProfileCliente(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/profile_client";
    return this.http.put(URL,data,{headers: headers});
  }

  CancelledSubcription(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/cancel_subcription";
    return this.http.post(URL,data,{headers: headers});
  }
}
