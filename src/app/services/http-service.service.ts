import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tokenNotExpired } from 'angular2-jwt';
import { Weather } from '../weather';
import { User }	from '../user';

@Injectable()

export class HttpService {
  user : any;
  authToken: any;

  constructor( private http: Http, router: Router) { }

  		getWeather(data) : Observable<any> {
         const ep = this.prepEndpoint('api/search');
  			return this.http.post(ep, {city: data})
  			.map((res:Response) => res.json())
  			.catch((error:any) => {return Observable.throw(error);
  			});				
  		}

  		GithubSignIn() {
  			return this.http.get('/auth/github')
  			.map((res:Response) => console.log('res'))
  			.catch((error:any) => {return Observable.throw(error);
  			});
  		}

  		GoogleSignIn() {
  			return this.http.get('api/auth/google')
  			.map((res:Response) => console.log(res))
  			.catch((error:any) => {return Observable.throw(error);
  			});
  		}

        storeUserData(token) {
          localStorage.setItem('id_token', token);
          this.authToken = token;
        }

        loadToken() {
          const token = localStorage.getItem('id_token');
          this.authToken = token;
          console.log(this.authToken);
        }

        loggedIn() {
          console.log("loggedIn");
          return tokenNotExpired();
        }

        logout() {
          const headers = new Headers();
          this.loadToken();
          headers.append('Authorization', this.authToken);
          headers.append('Content-Type', 'application/json');
          const ep = this.prepEndpoint('api/logout');
          return this.http.get(ep, {headers: headers})
            .map(res => res.json());
        }

        clearstorage () {
          this.authToken = null;
          this.user = null;
          localStorage.clear();
        }

        prepEndpoint(ep) {
            return 'http://localhost:3000/' + ep;
          }
}

