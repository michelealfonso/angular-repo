import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChildrenComponent } from "../children/children.component";

@Component({
  selector: 'app-background',
  imports: [
    ChildrenComponent
],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css'
})
export class BackgroundComponent {

}
