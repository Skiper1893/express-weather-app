import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpService]
})
export class RegistrationComponent implements OnInit{

 user : User;

  constructor(private registration: HttpService) { }

  Registration () {
  	this.registration.createUser(this.user.username ,this.user.email, this.user.password);
  	console.log("Отправлено");
    console.log(this.user.username);
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