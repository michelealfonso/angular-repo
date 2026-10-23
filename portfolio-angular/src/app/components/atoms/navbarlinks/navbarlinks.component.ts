import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-navbarlinks',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbarlinks.component.html',
})


export class NavbarlinksComponent {

  navlinks = [
    {
      id: 'about-section',
      title: 'About',
      linkUrl: "/about",
    },
    {
      id: 'experience-section',
      title: 'Experience',
      linkUrl: "/experience",
    },
    {
      id: 'projects-section',
      title: 'Projects',
      linkUrl: "/projects",
    },
    {
      id: 'contact-section',
      title: 'Contact',
      linkUrl: "/contact",
    },
  ];

    scrollNavigation(sectionId: any) {
        const scroll = document.getElementById(sectionId);
        scroll?.scrollIntoView({ behavior: 'smooth' });
    }
}

