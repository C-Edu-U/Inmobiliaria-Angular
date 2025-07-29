import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-editar-propiedad',
  standalone: true,
  templateUrl: './editar-propiedad.component.html',
  styleUrls: ['./editar-propiedad.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule, NavbarComponent]
})
export class EditarPropiedadComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  propiedad: any = null;
  imagenes: any[] = [];
  tipos: any[] = [];
  nuevaImagen: any = {};

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.cargarTipos();

    this.http.get<any>(`http://localhost:8000/get_propiedad.php?id=${id}`).subscribe({
      next: data => {
        this.propiedad = data.propiedad;
        this.imagenes = data.imagenes;
      },
      error: err => {
        console.error('Error al cargar propiedad', err);
        alert('No se pudo cargar la propiedad');
      }
    });
  }

  cargarTipos() {
    this.http.get<any[]>('http://localhost:8000/get_tipos.php')
      .subscribe(data => this.tipos = data);
  }

  guardarCambios() {
    this.http.post('http://localhost:8000/update_propiedad.php', this.propiedad).subscribe({
      next: () => alert('Propiedad actualizada correctamente'),
      error: err => {
        console.error('Error al actualizar propiedad', err);
        alert('Error al guardar cambios');
      }
    });
  }

  eliminarPropiedad() {
    if (!confirm('¿Estás seguro de eliminar esta propiedad?')) return;

    this.http.get(`http://localhost:8000/delete_propiedad.php?id=${this.propiedad.id_propiedad}`).subscribe({
      next: () => {
        alert('Propiedad eliminada');
        window.location.href = '/admin';
      },
      error: err => {
        console.error('Error al eliminar propiedad', err);
        alert('No se pudo eliminar');
      }
    });
  }

  agregarImagen() {
    this.nuevaImagen.id_propiedad = this.propiedad.id_propiedad;

    this.http.post('http://localhost:8000/upload_imagen.php', this.nuevaImagen).subscribe({
      next: () => {
        this.imagenes.push({ ...this.nuevaImagen });
        this.nuevaImagen = {};
      },
      error: err => {
        console.error('Error al subir imagen', err);
        alert('No se pudo agregar la imagen');
      }
    });
  }

  eliminarImagen(id_imagen: number) {
    if (!confirm('¿Eliminar esta imagen?')) return;

    this.http.get(`http://localhost:8000/delete_imagen.php?id=${id_imagen}`).subscribe({
      next: () => {
        this.imagenes = this.imagenes.filter(img => img.id_imagen !== id_imagen);
      },
      error: err => {
        console.error('Error al eliminar imagen', err);
        alert('No se pudo eliminar la imagen');
      }
    });
  }

  editarImagen(index: number) {
    const nuevaURL = prompt('Nueva URL de imagen:', this.imagenes[index].url);
    const nuevaDesc = prompt('Nueva descripción:', this.imagenes[index].descripcion);

    if (nuevaURL !== null && nuevaDesc !== null) {
      const imagen = this.imagenes[index];
      this.http.post('http://localhost:8000/update_imagen.php', {
        id_imagen: imagen.id_imagen,
        url: nuevaURL,
        descripcion: nuevaDesc
      }).subscribe({
        next: () => {
          imagen.url = nuevaURL;
          imagen.descripcion = nuevaDesc;
        },
        error: err => {
          console.error('Error al editar imagen', err);
          alert('No se pudo actualizar la imagen');
        }
      });
    }
  }
}
