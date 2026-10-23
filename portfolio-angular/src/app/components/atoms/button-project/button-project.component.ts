import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-button-project',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './button-project.component.html',
  styleUrl: './button-project.component.css'
})
export class ButtonProjectComponent {

  @Input() project!: Project;

  openProject() {
    window.open(this.project.url, '_blank')
  }

}
