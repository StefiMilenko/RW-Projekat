import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2>Register</h2>
    <input [(ngModel)]="username" placeholder="username" />
    <input [(ngModel)]="password" type="password" placeholder="password" />
    <button (click)="onRegister()">Register</button>
    <p *ngIf="error">{{ error }}</p>
    <p *ngIf="success">Registrovan! Idi na login.</p>
  `,
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = '';
  success = false;

  onRegister() {
    this.auth.register(this.username, this.password).subscribe({
      next: () => {
        this.success = true;
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: () => (this.error = 'Registracija nije uspela'),
    });
  }
}