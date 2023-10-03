import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from "../../components/navigation-bar/navigation-bar.component";
import {SearchBarComponent} from "../../components/navigation-bar/search-bar/search-bar.component";
import {SideBarComponent} from "../../components/navigation-bar/side-bar/side-bar.component";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    NavigationBarComponent,
    SearchBarComponent,
    SideBarComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        MatSidenavModule
    ],
  exports : [
    NavigationBarComponent,
    SearchBarComponent,
    SideBarComponent
  ]
})

export class CoreModule { }
