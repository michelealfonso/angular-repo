import { Component } from '@angular/core';

@Component({
  selector: 'app-button-cv',
  standalone: true,
  imports: [],
  templateUrl: './button-cv.component.html',
})
export class ButtonCvComponent {

  openCv() {
    window.open("../assets/resume.pdf")
  }
}
