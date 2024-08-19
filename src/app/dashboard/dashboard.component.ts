import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Products } from '../models/Products';

const Get_Products =gql`query{
  getProducts {
    id
    name
    description
    price
    image
   
  }
}`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit  {
  allProducts:Products[] =[];

  constructor(private apollo:Apollo){}
  ngOnInit(): void {
   this.apollo.watchQuery<any>({
    query: Get_Products
   }).valueChanges.subscribe(({data,loading})=>{
    console.log(loading);
     this.allProducts = data.getProducts;
   })
  }

}
