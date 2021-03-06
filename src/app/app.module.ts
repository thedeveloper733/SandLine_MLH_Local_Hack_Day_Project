import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainFlowComponent } from './main-flow/main-flow.component';
import { LoginFlowComponent } from './login-flow/login-flow.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { DoneFlowComponent } from './done-flow/done-flow.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { WarnDialogComponent } from './warn-dialog/warn-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFlowComponent,
    LoginFlowComponent,
    AdminDashComponent,
    DoneFlowComponent,
    ErrorDialogComponent,
    WarnDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
    ErrorDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
