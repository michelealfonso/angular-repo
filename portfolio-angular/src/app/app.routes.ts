import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AboutComponent } from './components/organisms/about/about.component';
import { ExperienceComponent } from './components/organisms/experience/experience.component';
import { ProjectsComponent } from './components/organisms/projects/projects.component';
import { ContactComponent } from './components/organisms/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: AboutComponent
  },
  {
      path: '',
      redirectTo: '',
      pathMatch: 'full',
      component: ExperienceComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: ProjectsComponent
  },
  {
      path: '',
      redirectTo: '',
      pathMatch: 'full',
      component: ContactComponent
  }
];

  @NgModule({
    imports: [
      BrowserAnimationsModule,
      BrowserAnimationsModule,
      AboutComponent,
      ExperienceComponent,
      ProjectsComponent,
      ContactComponent,
      RouterModule.forRoot([])
    ],
    exports: [RouterModule],
    declarations: [],
  })
  export class AppModule { }
