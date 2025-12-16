import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Redirigir al dashboard
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        // Mostrar mensaje de error si el login falla
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }

}
