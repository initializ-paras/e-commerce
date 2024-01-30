import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ReactiveFormsModule} from "@angular/forms";
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    ReactiveFormsModule
  ],
    exports: [
        PaginationModule,
        ReactiveFormsModule,
        TextInputComponent
    ],
  declarations: [
    TextInputComponent
  ],
})

export class SharedModule { }
