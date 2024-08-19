import { Component, OnInit } from '@angular/core';
import { gql,Apollo } from 'apollo-angular';
import { Users } from './models/Users';

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
  allUsers:Users[] = [];

  constructor(private apollo:Apollo){}
  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: Get_Users
    }).valueChanges.subscribe(({data,loading})=>{
     console.log(loading);
     this.allUsers = data.getUsers;
    })
  }
}
