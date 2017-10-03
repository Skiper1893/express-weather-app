import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpService]
})
export class RegistrationComponent{

 user : User;
 username : string;
 email : string;
 password : string;

  constructor(private registration: HttpService) { }



  Registration () {
  	this.registration.createUser(this.username ,this.email, this.password).subscribe(data => console.log(data));
  	console.log("Отправлено");
    // console.log(this.username);
    // console.log(this.email);
    // console.log(this.password);
  }
}