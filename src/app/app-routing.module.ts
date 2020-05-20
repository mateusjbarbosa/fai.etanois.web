import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';

import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostUpdateComponent } from './components/post/post-update/post-update.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { PostCrudComponent } from './views/post-crud/post-crud.component';
import { PostDeleteComponent } from './components/post/post-delete/post-delete.component';




const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"posts",
    component: PostCrudComponent
  },
  {
    path:"post/create",
    component: PostCreateComponent
  },
  {
    path:"post/update/:id",
    component: PostUpdateComponent
  },
  {
    path:"post/delete/:id",
    component: PostDeleteComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
