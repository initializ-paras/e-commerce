import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CatalogComponent} from "./components/catalog/catalog.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog/:category', component: CatalogComponent, data: { reuse: true } },
  { path: 'catalog/search_results', component: CatalogComponent, data: { reuse: true } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
