import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {path: 'home' , component : HomeComponent},
  {path: 'dashboard' , component : DashboardComponent, canActivate: [AuthGuardService]},
  // {path: 'success' , component : SuccessComponent}


    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
