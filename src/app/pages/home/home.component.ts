import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component'; // ajusta si está en otra carpeta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  properties = [
    {
      title: 'Casa Moderna en el Centro',
      address: 'Av. Libertad #123',
      price: 120000,
      description: 'Hermosa casa moderna con 3 dormitorios y jardín.',
      image: 'https://via.placeholder.com/400x250'
    },
    {
      title: 'Departamento con Vista',
      address: 'Edif. Panorama, Piso 10',
      price: 85000,
      description: 'Departamento con excelente vista y ubicación céntrica.',
      image: 'https://via.placeholder.com/400x250'
    },
    {
      title: 'Terreno en zona norte',
      address: 'Calle Los Pinos, Zona Norte',
      price: 60000,
      description: 'Terreno amplio y listo para construir.',
      image: 'https://via.placeholder.com/400x250'
    }
  ];
}
