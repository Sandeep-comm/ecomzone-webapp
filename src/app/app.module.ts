import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import {FormsModule} from '@angular/forms'
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './service/login.service';
import { AccountPageComponent } from './account-page/account-page.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AccountPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    FormsModule,
    GraphQLModule,
  
  
    
  ],
  providers: [LoginService,
    {
      provide: HttpClientModule,
      useFactory: () => provideHttpClient(withFetch()) // Enable fetch API for HttpClient
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
