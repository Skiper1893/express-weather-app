import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';
import { User } from '../user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [HttpService]
})
export class AuthComponent{

	user : User;
	email : string;
	password : string;

  constructor( private login : HttpService) {}

  Login() {
  	this.login.SignIn(this.email, this.password).subscribe(data => console.log(data));
  }
}