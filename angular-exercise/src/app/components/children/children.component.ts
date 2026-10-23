import { Component, Input, Output, EventEmitter} from '@angular/core';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-children',
  imports: [
    NgClass
  ],
  templateUrl: './children.component.html',
  styleUrl: './children.component.css'
})
export class ChildrenComponent {

@Input() isBlueParent: boolean = false;

}
