import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, NavbarComponent]
})
export class AdminComponent {
  http = inject(HttpClient);
  propiedades: any[] = [];
  tipos: any[] = [];
  nuevaPropiedad: any = { disponible: 1 };

  private isBrowser = typeof window !== 'undefined';

  ngOnInit() {
    if (this.isBrowser) {
      const usuario = localStorage.getItem('usuario');
      if (!usuario) {
        alert('Debes iniciar sesión');
        window.location.href = '/login';
        return;
      }

      this.cargarTipos();
      this.cargarPropiedades();
    }
  }

  cargarTipos() {
    this.http.get<any[]>('http://localhost:8000/get_tipos.php')
      .subscribe(data => this.tipos = data);
  }

  cargarPropiedades() {
    this.http.get<any[]>('http://localhost:8000/get_propiedades_admin.php')
      .subscribe(data => this.propiedades = data);
  }

  guardarPropiedad() {
    if (this.nuevaPropiedad.disponible === undefined) {
      this.nuevaPropiedad.disponible = 1; // por defecto disponible
    }

    this.http.post('http://localhost:8000/create_propiedad.php', this.nuevaPropiedad)
      .subscribe({
        next: () => {
          alert('Propiedad guardada correctamente');
          this.nuevaPropiedad = { disponible: 1 };
          this.cargarPropiedades();
        },
        error: (err) => {
          console.error('Error al guardar propiedad:', err);
          alert('Ocurrió un error al guardar');
        }
      });
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }
  }
}
