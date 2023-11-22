import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductDetailedComponent} from "../../components/product-detailed/product-detailed.component";
import {PaginationModule} from "ngx-bootstrap/pagination";

@NgModule({
  declarations: [
    ProductDetailedComponent
  ],
  imports: [
    CommonModule,
    PaginationModule
  ],
  exports: [
    ProductDetailedComponent,
    PaginationModule
  ],
})

export class SharedModule { }
