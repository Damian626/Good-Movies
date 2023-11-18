import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  showStreaming(slug:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/show-streaming/"+slug;
    return this.http.get(URL,{headers: headers});
  }

  homeMovies(){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/movie/home";
    return this.http.get(URL,{headers: headers});
  }

  storeReview(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/streaming_public/review";
    return this.http.post(URL,data,{headers: headers});
  }
}
