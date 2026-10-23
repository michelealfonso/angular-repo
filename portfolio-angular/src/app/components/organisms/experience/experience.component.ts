import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../../atoms/header/header.component";
import { SkillsComponent } from "../../moleculus/skills/skills.component";

@Component({
    selector: 'app-experience',
    standalone: true,
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.css',
    imports: [
        HeaderComponent,
        SkillsComponent
    ]
})
export class ExperienceComponent {
  @Input() title!: string;
  @Input() description!: string
}
