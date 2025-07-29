import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
  selector: 'app-detalle-propiedad',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, NavbarComponent],
  templateUrl: './detalle-propiedad.component.html',
  styleUrls: ['./detalle-propiedad.component.css']
})
export class DetallePropiedadComponent {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  propiedad: any = null;
  imagenes: any[] = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

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
}
