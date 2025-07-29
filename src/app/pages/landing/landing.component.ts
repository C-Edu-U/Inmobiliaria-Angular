import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component'; // Ajusta el path según tu estructura

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CurrencyPipe, RouterModule, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  http = inject(HttpClient);
  inmuebles: any[] = [];

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/get_propiedades_con_imagen.php')
      .subscribe(data => {
        this.inmuebles = data.filter((inmueble, index, self) =>
          index === self.findIndex(i => i.id_propiedad === inmueble.id_propiedad)
        );
      });
  }
}


