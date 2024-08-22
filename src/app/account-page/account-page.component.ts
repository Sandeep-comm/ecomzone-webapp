import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent implements OnInit{
  username: string | undefined;
  email: string | undefined;
  addresses: Array<any> = [];
  orders: Array<any> = [];
  
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    if (typeof window !== 'undefined' && window.localStorage) {
    const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  console.log('Retrieved credentials: ', storedUsername, storedPassword);
   
    if (storedUsername && storedPassword) {
      this.loginService.validateUser(storedUsername, storedPassword).subscribe({
        next: (result: any) => {
          const user = result?.data?.validateUser?.user;
          if (user) {
            this.username = user.username;
            this.email = user.email;
            this.addresses = user.addresses;
            this.orders = user.orders;
          } else {
            console.error('Invalid user details');
          }
        },
        error: (error: any) => {
          console.error('Error fetching user details', error);
        }
      });
    } else {
      console.error('No user credentials found');
    }
  }
}

}