import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-input-user',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './input-user.component.html',
  styleUrl: './input-user.component.css'
})
export class InputUserComponent {

  userName: string = '';

  setUserName(newName: string) {
    this.userName = newName;
    this.userName = '';
  }

}
