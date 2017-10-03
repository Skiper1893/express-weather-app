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

  		getWeather(data) : Observable<Weather[]> {

  			return this.http.post('/api/search', {city: data})
  			.map((res:Response) => res.json())
  			.catch((error:any) => {return Observable.throw(error);
  			});				
  		}

  		createUser(displayName, email, password) : Observable<User> {
  			let headers = new Headers();
        	headers.append('Content-Type', 'application/x-www-form-urlencoded');
        	
        	let urlSearchParams = new URLSearchParams();
        	urlSearchParams.append('displayName', displayName);
        	urlSearchParams.append('email', email);
        	urlSearchParams.append('password', password);
        	let data = urlSearchParams.toString();

  			return this.http.post('/api/user', data, {headers : headers})
  			.map((res:Response) => res.json())
  			.catch((error:any) => {return Observable.throw(error);
  			});		
  		}

  		SignIn(email, password) : Observable<User> {
  			let headers = new Headers();
        	headers.append('Content-Type', 'application/x-www-form-urlencoded');
        	
        	let urlSearchParams = new URLSearchParams();
        	urlSearchParams.append('email', email);
        	urlSearchParams.append('password', password);
        	let data = urlSearchParams.toString();
  			
  			return this.http.post('/api/login', data ,{headers : headers})
  			.catch((error:any) => {return Observable.throw(error);
 
  			});
  		}

  		GithubSignIn() {
  			console.log('1111');
  			let headers = new Headers();
        	headers.append('Api-User-Agent', 'Example/1.0');
  			return this.http.get('/auth/github', { headers : headers})
  			.map((res:Response) => console.log(res))
  			.catch((error:any) => {return Observable.throw(error);
  			});
  		}
}