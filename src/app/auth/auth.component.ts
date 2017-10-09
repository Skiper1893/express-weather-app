import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
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

  constructor(private validation: ValidateService, private login : AuthService, private router: Router) {}

  Login() {
    let data = {
      email     : this.email,
      password  : this.password
    }

    if (!this.validation.validateEmail(this.email)) {
      alert('Invalid email');
      return false;
    }

  	this.login.authenticateUser(data).subscribe(data => {
      if (data.success) {
        this.login.storeUserData(data.token);
        
        console.log(data);
        console.log(data.token);
        
        this.router.navigate(['/search']);
      }
    }, err => {
      console.log(err);
        this.router.navigate(['/login']);
    });
  }
}
