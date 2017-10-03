import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [HttpService]
})
export class AboutComponent{

  constructor(private github_auth : HttpService) { }

  GithubAuth() {
  	this.github_auth.GithubSignIn().subscribe(data => console.log(data));
  }
}
