import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AttendantComponent } from './pages/attendant/attendant.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { GoalsComponent } from './pages/goals/goals.component';
import { ManagementComponent } from './pages/management/management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuelAddEditComponent } from './dialogs/fuel-add-edit/fuel-add-edit.component';
import { FuelDeleteComponent } from './dialogs/fuel-delete/fuel-delete.component';
import { UserEditComponent } from './dialogs/user-edit/user-edit.component';
import { UserDeleteComponent } from './dialogs/user-delete/user-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AttendantComponent,
    RegistrationComponent,
    GoalsComponent,
    ManagementComponent,
    FuelDeleteComponent,
    UserDeleteComponent,
    UserEditComponent,
    FuelAddEditComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
