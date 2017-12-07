import { UserModule } from './user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {SuiModule} from 'ng2-semantic-ui';




@NgModule({
  declarations: [
    AppComponent, PageNotFoundComponent,
  ],
  imports: [
    BrowserModule, UserModule, AppRoutingModule, SuiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
