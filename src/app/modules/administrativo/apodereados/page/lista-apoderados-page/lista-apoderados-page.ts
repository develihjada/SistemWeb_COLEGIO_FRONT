import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarApoderadosPageComponent } from '../buscar-apoderados-page/buscar-apoderados-page';
import { DetalleApoderadosPage } from '../detalle-apoderados-page/detalle-apoderados-page';

@Component({
  selector: 'app-lista-apoderados-page',
  imports: [CommonModule, BuscarApoderadosPageComponent, DetalleApoderadosPage],
  templateUrl: './lista-apoderados-page.html',
  styleUrl: './lista-apoderados-page.css'
})
export class ListaApoderadosPage {
  showSearchModal: boolean = false;
  showDrawer: boolean = false;
  selectedApoderado: any = null;

  // Datos de ejemplo para mostrar en la tabla
  apoderados = [
    {
      id: 1,
      nombre: 'Juan Pérez García',
      dni: '12345678',
      telefono: '987654321',
      correo: 'juan.perez@mail.com',
      tipo: 'Padre'
    },
    {
      id: 2,
      nombre: 'María López Rodríguez',
      dni: '87654321',
      telefono: '912345678',
      correo: 'maria.lopez@mail.com',
      tipo: 'Madre'
    }
  ];

  openSearchModal(): void {
    this.showSearchModal = true;
  }

  closeSearchModal(): void {
    this.showSearchModal = false;
  }

  openDrawer(apoderado: any): void {
    this.selectedApoderado = apoderado;
    this.showDrawer = true;
  }

  closeDrawer(): void {
    this.showDrawer = false;
    this.selectedApoderado = null;
  }

  onEditApoderado(apoderado: any): void {
    console.log('Editar apoderado:', apoderado);
    // Aquí puedes navegar a la página de edición
    this.closeDrawer();
  }

  onDeleteApoderado(apoderadoId: number): void {
    console.log('Eliminar apoderado:', apoderadoId);
    // Aquí puedes mostrar un modal de confirmación
    this.closeDrawer();
  }
}
