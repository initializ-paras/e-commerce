import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const accountRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(accountRoutes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
