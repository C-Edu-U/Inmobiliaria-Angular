// src/app/components/navbar/navbar.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private isBrowser: boolean;

  constructor() {
    // Verifica si estamos en navegador
    this.isBrowser = typeof window !== 'undefined';
  }

  get isLoggedIn(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('usuario');
    }
    return false;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('usuario');
      window.location.href = '/';
    }
  }
}
