import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserCrudComponent } from './views/user-crud/user-crud.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { ObjectiveComponent } from './views/objective/objective.component';
import { AttendantAreaComponent } from './views/attendant-area/attendant-area.component';






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
    path:"attendant-area",
    component: AttendantAreaComponent
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
