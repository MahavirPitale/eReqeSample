import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http' 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { appRouting } from './app.routes'
import {AuthGuard} from './services/auth.guard';



import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LabslistComponent } from './components/labslist/labslist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LabslistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,MdInputModule,ReactiveFormsModule,
    FlexLayoutModule,HttpModule,appRouting
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
