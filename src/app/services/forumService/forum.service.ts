import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../../../../servidorConJWT/cliente';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Post } from '../../../../servidorConJWT/post';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  url: string = "http://localhost:3001/foro";
  private foroSubject = new BehaviorSubject<Post[]>([]); 
  foroSubject$ = this.foroSubject.asObservable(); // Observable para que otros componentes se suscriban


  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }



  getForo():Promise<any>{

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.loggedInUserToken}`
    });

    return this.http.get<Post[]>(this.url, {headers}).toPromise()
      .then((foro) => {
        this.foroSubject.next(foro!); 
    });
  }

  post(body: any):Promise<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.loggedInUserToken}`
    });
    return this.http.post(this.url, body, {headers}).toPromise().then(() => {
      this.getForo();
    });

  }


}
