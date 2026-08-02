import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <input [(ngModel)]="username" placeholder="username" />
    <input [(ngModel)]="password" type="password" placeholder="password" />
    <button (click)="onLogin()">Login</button>
    <p *ngIf="error">{{ error }}</p>
  `,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = '';

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/items']),
      error: () => (this.error = 'Pogrešno korisničko ime ili lozinka'),
    });
  }
}