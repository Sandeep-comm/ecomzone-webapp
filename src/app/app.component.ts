import { Component, OnInit } from '@angular/core';
import { gql,Apollo } from 'apollo-angular';
import { Users } from './models/Users';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';

const Get_Users =gql`query{
  getUsers{
    id
    username
    password
  }
}`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'ecomzone-webapp';
  isLoggedIn: boolean = false;
  

  constructor(private loginService: LoginService, private router: Router){
   
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isLoggedIn = this.loginService.isLoggedIn();
    }
  }
  

  logout() {
    this.loginService.logout();
    window.location.href = '/login'; // Redirect to login page
  }
}
