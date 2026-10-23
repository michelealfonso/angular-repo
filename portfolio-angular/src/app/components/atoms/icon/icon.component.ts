import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Icon } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})


export class IconComponent {

  @Input() iconSocial!: Icon;


  OpenSocial() {
    window.open(this.iconSocial.url, '_blank')
  }

}
