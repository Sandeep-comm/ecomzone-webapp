import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
    return this.apollo.query({
      query: gql`
        query {
          validateUser(username: "${username}", password: "${password}") {
            valid
            message
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
}
