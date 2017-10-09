import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [AuthService]
})
export class AboutComponent{

  constructor(private soc_auth : AuthService, private router: Router) { }

  GoogleAuthentification() {
    this.soc_auth.GoogleAuth().subscribe(data => {
    if (data) {
        this.soc_auth.storeUserData(data.token);
        console.log(data);
        this.router.navigate(['/search']);
      }
    }, err => {
      console.log(err);
        this.router.navigate(['/']);
    });
  }

  GithubAuthentification() {
    this.soc_auth.GithubAuth().subscribe(data => {
    if (data) {
        this.soc_auth.storeUserData(data.token);
        console.log(data);
        this.router.navigate(['/search']);
      }
    }, err => {
      console.log(err);
        this.router.navigate(['/']);
    });
  }
}