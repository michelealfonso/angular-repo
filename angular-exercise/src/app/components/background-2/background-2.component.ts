import { Component } from '@angular/core';
import { ChildrenComponent } from "../children/children.component";

@Component({
  selector: 'app-background-2',
  imports: [ChildrenComponent],
  templateUrl: './background-2.component.html',
  styleUrl: './background-2.component.css'
})
export class Background2Component {

    backgroundColor:boolean = false;
}
