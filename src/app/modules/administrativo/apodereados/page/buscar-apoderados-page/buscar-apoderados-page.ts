import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar-apoderados-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-apoderados-page.html',
  styleUrls: ['./buscar-apoderados-page.css']
})
export class BuscarApoderadosPageComponent {
  @Output() closeModal = new EventEmitter<void>();
  searchTerm: string = '';
  isSearching: boolean = false;
  searchResults: any[] = [];

  // Datos de ejemplo para la búsqueda
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
    },
    {
      id: 3,
      nombre: 'Carlos Mendoza Silva',
      dni: '45612378',
      telefono: '956789123',
      correo: 'carlos.mendoza@mail.com',
      tipo: 'Tutor'
    },
    {
      id: 4,
      nombre: 'Ana Martínez Torres',
      dni: '78945612',
      telefono: '945123678',
      correo: 'ana.martinez@mail.com',
      tipo: 'Madre'
    },
    {
      id: 5,
      nombre: 'Roberto Díaz Sánchez',
      dni: '15975348',
      telefono: '923456789',
      correo: 'roberto.diaz@mail.com',
      tipo: 'Padre'
    }
  ];

  constructor() {}

  onSearchChange(): void {
    if (this.searchTerm.trim().length === 0) {
      this.searchResults = [];
      this.isSearching = false;
      return;
    }

    if (this.searchTerm.trim().length >= 2) {
      this.isSearching = true;
      this.performSearch();
    }
  }

  private performSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();

    this.searchResults = this.apoderados.filter(apoderado =>
      apoderado.nombre.toLowerCase().includes(term) ||
      apoderado.dni.includes(term) ||
      apoderado.telefono.includes(term) ||
      apoderado.correo.toLowerCase().includes(term) ||
      apoderado.tipo.toLowerCase().includes(term)
    );
  }

  selectApoderado(apoderado: any): void {
    console.log('Apoderado seleccionado:', apoderado);
    // Aquí puedes agregar la lógica para manejar la selección
  }

  closeSearch(): void {
    this.searchTerm = '';
    this.searchResults = [];
    this.isSearching = false;
    this.closeModal.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeSearch();
    }
  }

  trackByApoderado(index: number, apoderado: any): number {
    return apoderado.id;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeSearch();
  }
}
