import { Component, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-srvice';
import { CommonModule } from '@angular/common';
import { Boards } from "../boards/boards";

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    Boards
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  username = '';
  showDropdown = false;

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;
  avatarURL: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.username = nav?.extras.state?.['username'] || localStorage.getItem('username') || '';

    const savedAvatar = localStorage.getItem('avatarURL')

       if (savedAvatar) {
      this.avatarURL = savedAvatar;
    }
  }

  toggleDropdown() {
    this.showDropdown = ! this.showDropdown;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Mostra anteprima immagine
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarURL = reader.result as string;

        localStorage.getItem(this.avatarURL)
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage() {
    if (!this.selectedFile) return;
    console.log('Upload file:', this.selectedFile);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/form']);
  }
}
