import { Component } from '@angular/core';
import { NavbarlinksComponent } from '../../atoms/navbarlinks/navbarlinks.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    imports: [NavbarlinksComponent]
})
export class NavbarComponent {

  logo = '../assets/icons/logo.svg';


}
