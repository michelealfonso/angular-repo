import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonProjectComponent } from '../../atoms/button-project/button-project.component';
import { Project } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    ButtonProjectComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

   projects: Project[] = [
    {
            id: '',
            picture: "../assets/images/fairylabs.svg",
            title: "FairyLabs.io",
            url: "https://fairylabs.io/",
            border: true
         },
         {
            id: '',
            picture: "../assets/images/weather.jpg",
            title: "Weather App",
            url: "https://weather-app-kappa-teal-24.vercel.app/",
            border: false
         },
         {
            id: '',
            picture: "../assets/images/game.png",
            title: "Rock, paper, scissors",
            url: "https://rock-paper-scissors-henna-six.vercel.app/",
            border: false
         },
         {
            id: '',
            picture: "../assets/images/image.jpeg",
            title: "Github projects",
            url: "https://github.com/michelealfonso?tab=repositories",
            border: true
         }
     ]

}
