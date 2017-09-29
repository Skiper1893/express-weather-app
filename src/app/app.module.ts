import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http ,HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TableComponent } from './table/table.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    { path: '', component: AboutComponent},
    { path: 'search', component: MainComponent},
    { path: '**', component: AboutComponent }
];

@NgModule ({
   imports:      [ BrowserModule, RouterModule.forRoot(appRoutes),HttpModule,FormsModule],
   declarations: [ AppComponent,		
   				   HeaderComponent,
   				   FooterComponent,
   				   TableComponent,
   				   AboutComponent,
   				   MainComponent, 
   				   AuthComponent],
   bootstrap:    [ AppComponent ]
})

export class AppModule { }