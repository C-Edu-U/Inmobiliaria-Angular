import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  http = inject(HttpClient);
  router = inject(Router);

  credentials = {
    username: '',
    password: ''
  };

  login() {
    this.http.post<any>('http://localhost:8000/login.php', this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('usuario', res.username);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error(err);
        alert('Credenciales incorrectas');
      }
    });
  }
}
