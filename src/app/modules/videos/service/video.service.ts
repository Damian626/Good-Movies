import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  homeVideos(){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/videos/home";
    return this.http.get(URL,{headers: headers});
  }
  
}
