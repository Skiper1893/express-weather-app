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
import { AuthGuard } from './guards/auth.guard';
import { RegistrationComponent } from './registration/registration.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http-service.service';

const appRoutes: Routes = [
    { path: '', component: AboutComponent},
    { path: 'search', component: MainComponent, canActivate: [AuthGuard]},
    { path: 'login', component: AuthComponent},
    { path: 'registration', component: RegistrationComponent},
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
   				   AuthComponent, 
   				   RegistrationComponent],
   providers:    [AuthGuard, AuthService, ValidateService, HttpService],
   bootstrap:    [ AppComponent ],

})

export class AppModule { }