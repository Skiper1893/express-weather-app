import { Component, OnInit } from '@angular/core';
import { HttpService } from './http-service.service';
import { InputComponent } from './input/input.component';
import { Weather } from './weather';
 
@Component ({
   selector: 'my-app',
   templateUrl: "./app.component.html",
   
})

export class AppComponent{

  title = '';
}
