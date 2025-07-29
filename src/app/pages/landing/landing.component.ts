import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CurrencyPipe],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  http = inject(HttpClient);
  inmuebles: any[] = [];

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8000/get_propiedades_con_imagen.php')
      .subscribe(data => this.inmuebles = data);
  }
}
