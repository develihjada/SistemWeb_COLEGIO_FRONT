import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-matricula-page',
  standalone: true,
  imports: [],
  templateUrl: './lista-matricula-page.component.html',
  styleUrl: './lista-matricula-page.component.css'
})
export class ListaMatriculaPageComponent {

  private router = inject(Router);

  Matricular() {
    this.router.navigate(['/registro_matricula']);
  }
}
