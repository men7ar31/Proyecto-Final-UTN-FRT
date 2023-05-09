import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SigninComponent } from "./components/signin/signin.component";
import { PrivateTasksComponent } from "./components/private-tasks/private-tasks.component";
import { SignupComponent } from "./components/signup/signup.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { MateriasFormComponent } from "./components/materias-form/materias-form.component";
import { ProfileComponent } from "./components/profile/profile.component";

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path:'',
    redirectTo:'/tasks',
    pathMatch: 'full'
  },
 {
  path:'tasks',
  component: TasksComponent
 },
 {
  path:'private',
  component: PrivateTasksComponent,
  canActivate:[AuthGuard]
 },
 {
  path:'profile',
  component: ProfileComponent,
  canActivate:[AuthGuard]
 },
 {
  path:'create-registro',
  component: MateriasFormComponent,
  canActivate:[AuthGuard]
 },
 {
  path:'signin',
  component: SigninComponent
 },
 {
  path:'signup',
  component: SignupComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
