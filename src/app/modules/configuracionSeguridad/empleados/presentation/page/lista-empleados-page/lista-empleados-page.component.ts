import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empleados-page',
  standalone: true,
  imports: [],
  templateUrl: './lista-empleados-page.component.html',
  styleUrl: './lista-empleados-page.component.css'
})
export class ListaEmpleadosPageComponent {

  private router = inject(Router);

  RegistroEmpleados(): void {
    this.router.navigate(['/registro_empleados']);
  }
}
