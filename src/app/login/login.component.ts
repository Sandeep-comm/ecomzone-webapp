import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService,private router: Router){}
  
  login() {
    this.loginService.validateUser(this.username, this.password).subscribe((result: any) => {
      if (result.data.validateUser.valid) {
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        this.loginService.setToken('someAuthToken');
        window.location.href = '/dashboard'; // Redirect to dashboard
      } else {
        alert(result.data.validateUser.message); // Show error message
      }
    });
  }

}
