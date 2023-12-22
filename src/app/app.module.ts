import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./modules/core/core.module";
import {CatalogModule} from "./components/catalog/catalog.module";
import {HomeModule} from "./home/home.module";
import {FiltersModule} from "./components/filters/filters.module";
import {SharedModule} from "./modules/shared/shared.module";
import {CustomRouteReuseStrategy} from "./custom-route-reuse-strategy";
import {RouteReuseStrategy} from "@angular/router";
import { FooterComponent } from './components/footer/footer.component';
import {ScrollerComponent} from "./components/scroller/scroller.component";
import { ErrorComponent } from './components/error/error.component';
import {ErrorInterceptor} from "./core/interceptors/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ScrollerComponent,
    ErrorComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        CoreModule,
        HomeModule,
        FiltersModule,
        SharedModule,
        AppRoutingModule,
        CatalogModule,
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
