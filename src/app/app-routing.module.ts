import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AccountPageComponent } from './account-page/account-page.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }, 
 
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'account', component: AccountPageComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
