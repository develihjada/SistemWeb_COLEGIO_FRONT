import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios-page',
  standalone: true,
  imports: [],
  templateUrl: './lista-usuarios-page.component.html',
  styleUrl: './lista-usuarios-page.component.css'
})
export class ListaUsuariosPageComponent {
  private router = inject(Router);

  RegistroUsuario() {
    this.router.navigate(['/registro_usuarios']);
  }
}
