import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PostDeleteComponent } from './components/post/post-delete/post-delete.component';
import { PostUpdateComponent } from './components/post/post-update/post-update.component';
import { PostCrudComponent } from './views/post-crud/post-crud.component';
import { AttendantAreaLoginComponent } from './views/attendant-area-login/attendant-area-login.component';
import { UserReadComponent } from './components/user/user-read/user-read.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';



import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { PostReadComponent } from './components/post/post-read/post-read.component';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostCreatedSuccessfullyComponent } from './views/post-created-successfully/post-created-successfully.component';
import { UserCreatedSuccessfullyComponent } from './views/user-created-successfully/user-created-successfully.component';
import { HeaderLogoComponent } from './components/template/header/header-logo/header-logo.component';
import { HeaderNavigationComponent } from './components/template/header/header-navigation/header-navigation.component';
import { HeaderNavigationUserAuthorizationComponent } from './components/template/header/header-navigation-user-authorization/header-navigation-user-authorization.component';
import { ObjectiveComponent } from './views/objective/objective.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { DialogElementsComponent } from './components/dialog-elements/dialog-elements.component';

import { ReactiveFormsModule } from "@angular/forms";
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';





registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserDeleteComponent,
    UserReadComponent,
    AttendantAreaLoginComponent,
    PostCrudComponent,
    PostCreateComponent,
    PostReadComponent,
    PostUpdateComponent,
    PostDeleteComponent,
    PostCreatedSuccessfullyComponent,
    UserCreatedSuccessfullyComponent,
    HeaderLogoComponent,
    HeaderNavigationComponent,
    HeaderNavigationUserAuthorizationComponent,
    ObjectiveComponent,
    NotFoundComponent,
    DialogElementsComponent,
    ForgotPasswordComponent,
 

 
    
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  /*adicionado AuthService */
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR',
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
