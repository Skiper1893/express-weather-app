import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev: boolean;

  constructor(private http: Http) {
    this.isDev = false; // Change to false before deployment
  }

  GoogleAuth() {
    const ep = this.prepEndpoint('api/auth/google');
    return this.http.get(ep)
    .map(res => res.json());
  }

  registerUser(user) {

    const ep = this.prepEndpoint('api/register');
    return this.http.post(ep, user)
      .map(res => res.json());
  }

  authenticateUser(user) {

    const ep = this.prepEndpoint('api/login');
    return this.http.post(ep, user)
      .map(res => res.json());
  }


  storeUserData(token) {
    localStorage.setItem('id_token', token);
    this.authToken = token;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
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
    if (this.isDev) {
      return ep;
    } else {
      return 'http://localhost/' + ep;
    }
  }
}
