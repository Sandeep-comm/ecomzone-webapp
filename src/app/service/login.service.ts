import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private username: string | null = null;
  private password: string | null = null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  constructor(private apollo: Apollo) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      this.isLoggedInSubject.next(!!token);
    }
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  validateUser(username: string, password: string) {
    this.username = username;
    this.password = password;
    return this.apollo.query({
      query: gql`
        query {
          validateUser(username: "${username}", password: "${password}") {
            valid
            message
            user {
      username
      email
      addresses {
        street
        city
        state
        zip
      }
      orders {
        totalPrice
        orderDate
      }
    }
          }
        }
      `
    });
  }
  setToken(token: string) {
    localStorage.setItem('authToken', token);
    this.isLoggedInSubject.next(true);
  }
  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }
  getUsername(): string | null {
    return this.username;
  }

  getPassword(): string | null {
    return this.password;
  }
}
