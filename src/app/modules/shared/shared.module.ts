import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductDetailedComponent} from "../../components/product-detailed/product-detailed.component";

@NgModule({
  declarations: [
    ProductDetailedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductDetailedComponent
  ],
})

export class SharedModule { }
