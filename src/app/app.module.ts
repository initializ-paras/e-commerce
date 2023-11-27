import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {CoreModule} from "./modules/core/core.module";
import {CatalogModule} from "./components/catalog/catalog.module";
import {HomeModule} from "./home/home.module";
import {FiltersModule} from "./components/filters/filters.module";
import {SharedModule} from "./modules/shared/shared.module";
import { NgxSliderModule } from 'ngx-slider-v2';
import {CustomRouteReuseStrategy} from "./custom-route-reuse-strategy";
import {RouteReuseStrategy} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    CatalogModule,
    HomeModule,
    FiltersModule,
    SharedModule,
    NgxSliderModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
