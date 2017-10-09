import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {

  constructor(private auth : AuthService) { }

  loggout() {
  	this.auth.logout().subscribe(data => { 
  	console.log(data);
  });
  }

  ngOnInit() {
  }

}
