import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from '../../moleculus/navbar/navbar.component';
import { ButtonCvComponent } from "../../atoms/button-cv/button-cv.component";
import { ButtonInfoComponent } from "../../atoms/button-info/button-info.component";
import {NgxTypedJsModule} from 'ngx-typed-js';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
    selector: 'app-hero',
    standalone: true,
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css',
    imports: [
      CommonModule,
      NgxTypedJsModule,
      NavbarComponent,
      ButtonCvComponent,
      ButtonInfoComponent,
      IconComponent
    ]
})

export class HeroComponent {

  profileImage = '../assets/icons/profile.svg'

  icons = [
    {
        id: '',
        picture: '../assets/icons/socials/linkedin.svg',
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/michele-alfonso-27484419a/',

    },
    {
        id: '',
        picture: '../assets/icons/socials/twitter.svg',
        name: 'twitter',
        url: ' ',
    },
    {
        id: '',
        picture: '../assets/icons/socials/instagram.svg',
        name: 'instagram',
        url: 'https://www.instagram.com/_michi_alfi_/',
    }
  ]

}

@NgModule({
  imports: [
    NgxTypedJsModule,
  ],
})

export class AppModule {
}
