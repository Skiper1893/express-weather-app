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
    let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', 'http://my-weather-app.com');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Headers', 'X-Custom-Header');
        headers.append('Host', 'github.com');
    const ep = this.prepEndpoint('api/auth/google');
    return this.http.get(ep)
    .map(res => res.json());
  }

  GithubAuth() {
    let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Headers', 'X-Custom-Header');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const ep = this.prepEndpoint('api/auth/github');
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
      return 'http://localhost:3000/' + ep;
    }
}
