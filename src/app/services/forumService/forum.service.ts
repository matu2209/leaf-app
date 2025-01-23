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
  currentPostId: number = -1;
  private foroSubject = new BehaviorSubject<Post[]>([]); 
  foroSubject$ = this.foroSubject.asObservable(); // Observable para que otros componentes se suscriban


  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }



  getForo():Promise<any>{

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.loggedInUserToken}`
    });

    return this.http.get<Post[]>(this.url, {headers}).toPromise()
      .then((foro) => {
        this.foroSubject.next(foro?.reverse()!); 
    });
  }

  getForoFilter(categories: String []): Post[]{

    const posts:Post[] = this.foroSubject.value.filter(post => categories.includes(post.category));
    console.log(posts);
    return posts;
  }
  post(body: any):Promise<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.loggedInUserToken}`
    });
    return this.http.post<Post>(this.url, body, {headers}).toPromise().then((newPost) => {
      if (!newPost) {
        console.error('no post');
        return; 
      }
      const foro = this.foroSubject.getValue();
      foro.unshift(newPost);
      this.foroSubject.next(foro);
    });
  }

  commentPost(body: any):Promise<any>{
    body.postId = this.currentPostId;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.loggedInUserToken}`
    });
    return this.http.post<Post>(this.url + "/comment", body, {headers}).toPromise().then((updatedPost) => {
      if (!updatedPost) {
        console.error('No post.');
        return;
      }
      const foro = this.foroSubject.getValue();
      const postIndex = foro.findIndex(post => post.id === updatedPost.id);

      if (postIndex !== -1) {
      foro[postIndex].comments = updatedPost.comments;
      this.foroSubject.next(foro);
      }
      
    });
  }

}
