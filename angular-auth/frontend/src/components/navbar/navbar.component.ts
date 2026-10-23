import { Component } from '@angular/core';
import { SignInComponent } from "../sign-in/sign-in.component";

@Component({
  selector: 'app-navbar',
  imports: [SignInComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
