import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';
import { User } from '../user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [HttpService]
})
export class AuthComponent implements OnInit{

	user : User;

  constructor( private login : HttpService) {}

  Login() {
  	this.login.SignIn(this.user.email, this.user.password);
  	console.log("Отправлено");
    console.log(this.user.email);
    console.log(this.user.password);

  }

  ngOnInit() {
  	this.user = {
  			username : '',
			email 	: '',
			password : ''
		}
  }
}
