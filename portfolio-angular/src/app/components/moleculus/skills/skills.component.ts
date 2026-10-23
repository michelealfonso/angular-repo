import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

  experiences = [
    {
        id: '',
        skills: 'HTML',
        level: 'Experienced'
    },
    {
        id: '',
        skills: 'CSS',
        level: 'Experienced',
    },
    {
        id: '',
        skills: 'Javascript',
        level: 'Intermediate'
    },
    {
        id: '',
        skills: 'Typescript',
        level: 'Intermediate'
    },
    {
        id: '',
        skills: 'React',
        level: 'Intermediate'
    },
    {
        id: '',
        skills: 'Angular',
        level: 'Basic',
    },
  ]

}
