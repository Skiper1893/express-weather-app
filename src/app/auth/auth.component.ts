import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent{

	email : string;
	password : string;

  constructor( private login : AuthService, private router: Router) {}

  Login() {
    let data = {
      email     : this.email,
      password  : this.password
    }
  	this.login.authenticateUser(data).subscribe(data => {
      if (data.success) {
        this.login.storeUserData(data.token);
        console.log('success');
        this.router.navigate(['/search']);
      }
    }, err => {
      console.log(err);
        this.router.navigate(['/login']);
    });
  }
}
