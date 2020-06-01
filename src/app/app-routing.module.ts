import { ManagerAreaLoginComponent } from './views/manager-area-login/manager-area-login.component';
import { AttendantAreaLoginComponent } from './views/attendant-area-login/attendant-area-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserCrudComponent } from './views/user-crud/user-crud.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';








const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"manager-area-login",
    component: ManagerAreaLoginComponent
  },
  {
    path:"attendant-area-login",
    component: AttendantAreaLoginComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"user",
    component: UserCrudComponent
  },
  {
    path:"user/create",
    component: UserCreateComponent
  },
  {
    path:"user/update/:id",
    component: UserUpdateComponent
  },
  {
    path:"user/delete/:id",
    component: UserDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
