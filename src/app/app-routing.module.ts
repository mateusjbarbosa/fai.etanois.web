import { FuelStationReadComponent } from './components/fuel-station/fuel-station-read/fuel-station-read.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ObjectiveComponent } from './views/objective/objective.component';
import { UserCreatedSuccessfullyComponent } from './views/user-created-successfully/user-created-successfully.component';
import { AttendantAreaLoginComponent } from './views/attendant-area-login/attendant-area-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { PostCrudComponent } from './views/post-crud/post-crud.component';
import { PostCreatedSuccessfullyComponent } from './views/post-created-successfully/post-created-successfully.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { FuelStationCreateComponent } from './components/fuel-station/fuel-station-create/fuel-station-create.component';
import { FuelStationUpdateComponent } from './components/fuel-station/fuel-station-update/fuel-station-update.component';
import { FuelStationDeleteComponent } from './components/fuel-station/fuel-station-delete/fuel-station-delete.component';








const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"objectives",
    component: ObjectiveComponent
  },
  {
    path:"attendant/area/login",
    component: AttendantAreaLoginComponent
  },
  {
    path:"Forgot/Password",
    component: ForgotPasswordComponent
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
  },
  {
    path:"post",
    component: PostCrudComponent
  },
  {
    path:"fuelStation/create",
    component: FuelStationCreateComponent
  },
  {
    path:"fuelStation/update/:id",
    component: FuelStationUpdateComponent
  },
  {
    path:"fuel/delete/:id",
    component: FuelStationDeleteComponent
  },
  {
    path:"fuel/read/:id",
    component: FuelStationReadComponent
  },
  {
    path:"post/created/successfully",
    component: PostCreatedSuccessfullyComponent
  },
  {
    path:"user/created/successfully",
    component: UserCreatedSuccessfullyComponent
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
