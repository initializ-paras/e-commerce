import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginationModule,
    ReactiveFormsModule
  ],
})

export class SharedModule { }
