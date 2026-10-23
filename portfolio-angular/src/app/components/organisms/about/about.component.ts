import { Component, Input, OnInit,  } from '@angular/core';
import { CommonModule, } from '@angular/common';

import { NavbarlinksComponent } from '../../atoms/navbarlinks/navbarlinks.component';
import { HeaderComponent } from "../../atoms/header/header.component";
import { ShowComponent } from '../../atoms/show/show.component';



@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: '/src/styles.css',
    imports: [
      CommonModule,
      HeaderComponent,
      NavbarlinksComponent,
      ShowComponent,
      ],
})


export class AboutComponent implements OnInit {

  ngOnInit(): void {}

  @Input() title!: string;
  @Input() description!: string


  abouts = [
    {
      id: "experience",
      icon: "/icons/experience.svg",
      title: "Experience",
      border: true,
      description: {
        visible: `Specialized <b> PWA </b> developed with <b> Next.js </b> and <b> Angular </b> as frameworks.
                  I'm currently studying <b> Ionic </b> for building mobile apps.`,
        collapsible: `In the last period I have seen liberties like <b> Redux </b>,
                      moudle bundles like <b> Webpack </b>, to make the code even cleaner and more functional.`,
      },
    },
    {
      id: "education",
      icon: "/icons/education.svg",
      title: "Education",
      border: false,
      description: {
        visible: `I started almost two years ago, learning the basics of <b> HTML </b>, <b> CSS </b> and <b> Javascript </b>, creating the first sites and the first test apps.`,
        collapsible: `Once I learned the basics, I continued learning libraries as <b> React </b> and
              frameworks including <b> Angular </b> and <b> Next.js </b> mainly using the latter.`,
      },
    },
  ];


//   isHidden = true;

//   toggle() {
//     this.isHidden = !this.isHidden;
//   }
  }
