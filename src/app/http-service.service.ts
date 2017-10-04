import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Weather } from './weather';
import { User }	from './user';


@Injectable()

export class HttpService {

  constructor( private http: Http, router: Router) { }

  		getWeather(data) : Observable<any> {

  			return this.http.post('/api/search', {city: data})
  			.map((res:Response) => res.json())
  			.catch((error:any) => {return Observable.throw(error);
  			});				
  		}

  		createUser(user) : Observable<any> {
  			let headers = new Headers();
        	headers.append('Content-Type', 'application/x-www-form-urlencoded');
        	headers.append('WWW-Authenticate', 'Server-Authorization');
        	let urlSearchParams = new URLSearchParams();
        	urlSearchParams.append('displayName', user.displayName);
        	urlSearchParams.append('email', user.email);
        	urlSearchParams.append('password', user.password);
        	let data = urlSearchParams.toString();

  			return this.http.post('/api/user', data, {headers : headers})
  			.map((res:Response) => res.json())
  			.catch((error:any) => {return Observable.throw(error);
  			});		
  		}

  		SignIn(user) : Observable<any> {
  			let headers = new Headers();
        	headers.append('Content-Type', 'application/x-www-form-urlencoded');
        	headers.append('WWW-Authenticate', 'Server-Authorization');
        	let urlSearchParams = new URLSearchParams();
        	urlSearchParams.append('email', user.email);
        	urlSearchParams.append('password', user.password);
        	let data = urlSearchParams.toString();
  			
  			return this.http.post('/api/login', data ,{headers : headers})
  			.catch((error:any) => {return Observable.throw(error);
 
  			});
  		}

  		GithubSignIn() {
  			console.log('github');
  			let headers = new Headers();
        	headers.append('Api-User-Agent', 'Example/1.0');
  			return this.http.get('/auth/github', { headers : headers})
  			.map((res:Response) => console.log('res'))
  			.catch((error:any) => {return Observable.throw(error);
  			});
  		}

  		GoogleSignIn() {
  			console.log('google');
  			let headers = new Headers();
        	headers.append('Api-User-Agent', 'Example/1.0');
  			return this.http.get('/auth/google', { headers : headers})
  			.map((res:Response) => console.log(res))
  			.catch((error:any) => {return Observable.throw(error);
  			});
  		}
}