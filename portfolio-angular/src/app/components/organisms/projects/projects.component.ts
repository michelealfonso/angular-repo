import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../../atoms/header/header.component";
import { ProjectComponent } from "../../moleculus/project/project.component";

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
    imports: [
      HeaderComponent,
      ProjectComponent
    ]
})
export class ProjectsComponent {
  @Input() title!: string;
  @Input() description!: string

}
