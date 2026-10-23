import { Component, OnInit, HostBinding } from '@angular/core';
import { HeroComponent } from "./components/organisms/hero/hero.component";
import { NavbarComponent } from "./components/moleculus/navbar/navbar.component";
import { AboutComponent } from "./components/organisms/about/about.component";
import { ExperienceComponent } from './components/organisms/experience/experience.component';
import { ChildrenOutletContexts, RouterLink, RouterOutlet } from '@angular/router';
import { ProjectsComponent } from "./components/organisms/projects/projects.component";
import { ContactComponent } from "./components/organisms/contact/contact.component";

import { IStaticMethods } from 'preline/preline';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        HeroComponent,
        NavbarComponent,
        AboutComponent,
        ExperienceComponent,
        ProjectsComponent,
        ContactComponent,
        RouterLink,
        RouterOutlet,

    ],
    animations: []
})
export class AppComponent implements OnInit {

  title = 'portfolio-angular';

  constructor(private contexts: ChildrenOutletContexts) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }




  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
