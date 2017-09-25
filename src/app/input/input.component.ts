import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Weather } from '../weather';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [HttpService]
})

export class InputComponent {
	city : string;

	receivedWeather : Weather;

 constructor( private HttpService :HttpService) {}
  weather : Weather[] = [];

  loadWeather() {
  	
    this.HttpService.getWeather(this.city).subscribe(data => console.log(data));
  }
}
