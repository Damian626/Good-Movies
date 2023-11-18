import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  homeTvShows(){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/tv-show/home";
    return this.http.get(URL,{headers: headers});
  }
  
}
