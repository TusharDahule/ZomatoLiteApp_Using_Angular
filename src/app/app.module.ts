import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   // RecipesModule, //dont import as we are importing as lazy loading
  //  ShoppingListModule, //dont import as we are importing as lazy loading
    SharedModule,
    CoreModule,
  //  AuthModule/* provides services */ //dont import as we are importing as lazy loading
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
