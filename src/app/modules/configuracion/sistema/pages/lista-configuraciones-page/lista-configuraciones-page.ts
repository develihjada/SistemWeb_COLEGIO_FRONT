import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-configuraciones-page',
  imports: [],
  templateUrl: './lista-configuraciones-page.html',
  styleUrl: './lista-configuraciones-page.css'
})
export class ListaConfiguracionesPage {

  // Métodos para abrir configuraciones de Catálogos Generales
  openTiposDocumentos(): void {
    console.log('Abriendo configuración de Tipos de Documentos');
    // Aquí puedes agregar la lógica para abrir un modal o navegar a otra página
  }

  openGeneros(): void {
    console.log('Abriendo configuración de Géneros');
    // Lógica para gestionar géneros
  }

  openEstadosCiviles(): void {
    console.log('Abriendo configuración de Estados Civiles');
    // Lógica para gestionar estados civiles
  }

  openTiposRelacion(): void {
    console.log('Abriendo configuración de Tipos de Relación Familiar');
    // Lógica para gestionar tipos de relación familiar
  }

  // Métodos para abrir configuraciones Académicas
  openTiposEvaluacion(): void {
    console.log('Abriendo configuración de Tipos de Evaluación');
    // Lógica para gestionar tipos de evaluación
  }

  openPeriodosAcademicos(): void {
    console.log('Abriendo configuración de Períodos Académicos');
    // Lógica para gestionar períodos académicos
  }

  openMaterias(): void {
    console.log('Abriendo configuración de Materias/Asignaturas');
    // Lógica para gestionar materias
  }

  // Métodos para abrir configuraciones del Sistema
  openConfiguracionGeneral(): void {
    console.log('Abriendo Configuración General del Sistema');
    // Lógica para configuración general
  }

  openRespaldos(): void {
    console.log('Abriendo configuración de Respaldos');
    // Lógica para gestionar respaldos
  }

  openNotificaciones(): void {
    console.log('Abriendo configuración de Notificaciones');
    // Lógica para gestionar notificaciones
  }
}
