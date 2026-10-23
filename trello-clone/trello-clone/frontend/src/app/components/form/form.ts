import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-srvice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './form.html',
  styleUrl: './form.css',
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class Form {
  mode: 'login' | 'register' = 'login';
  username = '';
  email = '';
  password = '';
  error = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.error = '';
    this.message = '';
  }

  async submit() {
    this.error = '';
    this.message = '';

  const cleanedEmail = this.email.trim().toLowerCase();
  const cleanedUsername = this.username.trim();
  const cleanedPassword = this.password;

  console.log(cleanedEmail)

    try {
      if (this.mode === 'login') {
        console.log('Login con:', {
          email: cleanedEmail,
          password: cleanedPassword,
        });
        const response = await firstValueFrom(
          this.authService.login(cleanedEmail, cleanedPassword)
        );
        console.log(response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response['username']),
          this.router.navigate(['/dashboard']);
        }
        this.message = 'Login effettuato con successo!';
      } else {
        console.log('Registrazione con:', {
          username: cleanedUsername,
          email: cleanedEmail,
          password: cleanedPassword,
        });
        const response = await firstValueFrom(
          this.authService.register(cleanedUsername, cleanedEmail, cleanedPassword)
        );
        console.log(response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        }
        this.message = 'Registrazione effettuata! Controlla la tua email per la conferma.';
      }
    } catch (error: any) {
      this.error = error.message || "Errore durante l'operazione";
    }
  }
}
