import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  roleId: number =4;
  errorMessage: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(private apollo: Apollo) {}

  
  


  register(form: NgForm): void {
    if (form.valid && this.password === this.confirmPassword) {
      this.apollo.mutate({
        mutation: gql`
          mutation RegisterUser($username: String!, $password: String!, $email: String!, $roleId: Int!) {
            createUser(username: $username, password: $password, email: $email, roleId: $roleId) {
              id
              username
              email
            }
          }
        `,
        variables: {
          username: this.username,
          password: this.password,
          email: this.email,
          roleId: this.roleId
        }
      }).subscribe({
          next: (result) => {
            console.log('Registration successful', result);
            // Handle successful registration
          },
          
        error: (error) => {
          console.error('Error during registration:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    }
    else {
      if (this.password !== this.confirmPassword) {
        this.passwordMismatch = true;
      }
      console.log('Form is invalid or passwords do not match');
    }
      
}

}
