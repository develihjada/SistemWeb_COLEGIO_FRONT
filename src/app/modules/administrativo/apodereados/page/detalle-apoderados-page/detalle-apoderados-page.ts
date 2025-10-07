import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ApoderadoDetalle {
  id: number;
  nombre: string;
  dni: string;
  telefono: string;
  correo: string;
  tipo: string;
  direccion?: string;
  fechaNacimiento?: string;
  profesion?: string;
  estadoCivil?: string;
  telefonoEmergencia?: string;
  observaciones?: string;
  fechaRegistro?: string;
  ultimaActualizacion?: string;
}

@Component({
  selector: 'app-detalle-apoderados-page',
  imports: [CommonModule],
  templateUrl: './detalle-apoderados-page.html',
  styleUrl: './detalle-apoderados-page.css'
})
export class DetalleApoderadosPage implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() apoderado: ApoderadoDetalle | null = null;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() editApoderado = new EventEmitter<ApoderadoDetalle>();
  @Output() deleteApoderado = new EventEmitter<number>();

  activeTab: string = 'general';
  isAnimating: boolean = false;

  // Datos de ejemplo expandidos para mostrar el drawer
  apoderadoEjemplo: ApoderadoDetalle = {
    id: 1,
    nombre: 'Juan Pérez García',
    dni: '12345678',
    telefono: '987654321',
    correo: 'juan.perez@mail.com',
    tipo: 'Padre',
    direccion: 'Av. Los Olivos 123, San Isidro, Lima',
    fechaNacimiento: '1985-03-15',
    profesion: 'Ingeniero de Sistemas',
    estadoCivil: 'Casado',
    telefonoEmergencia: '912345678',
    observaciones: 'Apoderado muy colaborativo con las actividades escolares.',
    fechaRegistro: '2023-02-15',
    ultimaActualizacion: '2024-09-20'
  };

  // Datos adicionales para tabs
  estudiantes = [
    { nombre: 'Ana Pérez López', grado: '5to Primaria', seccion: 'A', estado: 'Activo' },
    { nombre: 'Carlos Pérez López', grado: '2do Secundaria', seccion: 'B', estado: 'Activo' }
  ];

  historialActividades = [
    { fecha: '2024-09-20', actividad: 'Reunión de padres', tipo: 'reunion', descripcion: 'Asistió a reunión académica del primer bimestre' },
    { fecha: '2024-09-15', actividad: 'Actualización de datos', tipo: 'actualizacion', descripcion: 'Modificó número de teléfono y dirección' },
    { fecha: '2024-09-10', actividad: 'Pago de pensión', tipo: 'pago', descripcion: 'Canceló mensualidad de septiembre' },
    { fecha: '2024-09-05', actividad: 'Justificación de ausencia', tipo: 'justificacion', descripcion: 'Justificó ausencia por motivos médicos' }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && changes['isOpen'].currentValue) {
      this.activeTab = 'general';
      this.isAnimating = true;
      setTimeout(() => this.isAnimating = false, 300);
    }
  }

  onCloseDrawer(): void {
    this.closeDrawer.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onCloseDrawer();
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onEditApoderado(): void {
    const apoderadoActual = this.apoderado || this.apoderadoEjemplo;
    this.editApoderado.emit(apoderadoActual);
  }

  onDeleteApoderado(): void {
    const apoderadoActual = this.apoderado || this.apoderadoEjemplo;
    this.deleteApoderado.emit(apoderadoActual.id);
  }

  getInitials(nombre: string): string {
    return nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getIconForActivityType(tipo: string): string {
    const icons: { [key: string]: string } = {
      'reunion': 'ti-users',
      'actualizacion': 'ti-edit',
      'pago': 'ti-credit-card',
      'justificacion': 'ti-file-text'
    };
    return icons[tipo] || 'ti-activity';
  }

  getColorForActivityType(tipo: string): string {
    const colors: { [key: string]: string } = {
      'reunion': 'text-info',
      'actualizacion': 'text-warning',
      'pago': 'text-success',
      'justificacion': 'text-primary'
    };
    return colors[tipo] || 'text-secondary';
  }

  getCurrentApoderado(): ApoderadoDetalle {
    return this.apoderado || this.apoderadoEjemplo;
  }

  trackByFn(index: number, item: any): any {
    return item.fecha || index;
  }
}
