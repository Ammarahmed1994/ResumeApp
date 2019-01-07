import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgGridModule} from 'ag-grid-angular';
import { HeaderComponent } from './home/header/header.component';
import { StudentComponent } from './home/student/student.component';
import { ManagerComponent } from './home/manager/manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    StudentComponent,
    ManagerComponent,
    DashboardComponent,
    NavbarComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
