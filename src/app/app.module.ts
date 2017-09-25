import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { Http ,HttpModule } from '@angular/http';
import { InputComponent } from './input/input.component';
import { FormsModule }   from '@angular/forms';


@NgModule ({
   imports:      [ BrowserModule,HttpModule,FormsModule],
   declarations: [ AppComponent,InputComponent],
   bootstrap:    [ AppComponent ]
})
export class AppModule { }