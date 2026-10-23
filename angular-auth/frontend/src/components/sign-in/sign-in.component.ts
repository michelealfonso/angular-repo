import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  user: any;

  constructor(private router: Router) {}

    signIn(): void {
      console.log('hai cliccato signIn')
      this.router.navigate(['/sign-in-form']);
    }

    signOut(): void {
      console.log('hai cliccato signOut')
      this.router.navigate(['/home']);
    }
}
