import { Component } from '@angular/core';

@Component({
  selector: 'app-button-info',
  standalone: true,
  imports: [],
  templateUrl: './button-info.component.html',
})
export class ButtonInfoComponent {


  scrollNavigation() {
    const scroll = document.getElementById('contact-section')
    scroll?.scrollIntoView({ behavior: 'smooth' });
}
}
