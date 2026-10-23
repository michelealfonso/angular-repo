import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
import { SignInFormComponent } from '../components/sign-in-form/sign-in-form.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'sign-in-form', component:  SignInFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    // AuthenticationService,
    // AuthGuard,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
