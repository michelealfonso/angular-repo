import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dinamic-list',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dinamic-list.component.html',
  styleUrl: './dinamic-list.component.css'
})
export class DinamicListComponent {

  list: string[] = [
    'pane',
    'latte',
    'biscotti'
  ];

  newElement: string = '';

  updateElement(): void {
    if(this.newElement) {
      this.list.push(this.newElement);
      this.newElement = '';
    }
  }

}
