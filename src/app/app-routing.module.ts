import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrorComponent} from "./components/error/error.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', loadChildren: () => import('./components/catalog/catalog.module').then(m => m.CatalogModule) },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
