import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [ValidateService, AuthService]
})

export class RegistrationComponent {

 displayName : string;
 email : string;
 password : string;

constructor( private validateService : ValidateService,
    private authService : AuthService,
    private router : Router
    ) { }

  onRegisterSubmit() {

    const user = {
      username: this.displayName,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      console.log('Invalid register');
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      console.log('Invalid email');
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        console.log(data);
        console.log('success');
        this.router.navigate(['/login']);
      }
    }, err => {
      console.log(err);
        this.router.navigate(['/register']);
    });
  }
}