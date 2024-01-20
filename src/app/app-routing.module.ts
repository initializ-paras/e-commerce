import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrorComponent} from "./components/error/error.component";

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: { label: 'Home' } } },
  { path: 'catalog', loadChildren: () => import('./components/catalog/catalog.module').then(m => m.CatalogModule) },
  { path: 'account', loadChildren: () => import('../app/modules/account/account.module').then(m => m.AccountModule) },
  { path: '**', pathMatch: 'full', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
