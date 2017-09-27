import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http ,HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TableComponent } from './table/table.component';



@NgModule ({
   imports:      [ BrowserModule,HttpModule,FormsModule],
   declarations: [ AppComponent, HeaderComponent, FooterComponent, TableComponent],
   bootstrap:    [ AppComponent ]
})

export class AppModule { }