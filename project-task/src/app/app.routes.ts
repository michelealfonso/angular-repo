import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/add-project/add-project.component';
import { TaskComponent } from './components/add-task/add-task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { AdminGuard } from './guards/admin-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ProjectService } from './services/project-service.service';
import { AddProjectInterceptor } from './interceptors/project-interceptor.interceptor';
// import { ProjectInterceptor } from './interceptors/project-interceptor.interceptor';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Rotta predefinita
  { path: 'login', component: LoginComponent },  // Rotta di default (root)
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Rotta per la dashboard


  /*
  { path: 'add-project', component: ProjectComponent },  // Rotta per la creazione di un progetto
  { path: 'add-task', component: TaskComponent },  // Rotta per aggiungere un task
  { path: 'tasks/:projectId', component: TaskComponent },  // Rotta per visualizzare i task di un progetto
  { path: 'login', component: LoginComponent },  // La pagina di login è pubblica
  { path: '**', redirectTo: '/login' },  // Gestisce le rotte non trovate
   */
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddProjectInterceptor,
      multi: true, // Aggiungi l'interceptor alla catena
    },
  ]
})
export class AppModule {}
