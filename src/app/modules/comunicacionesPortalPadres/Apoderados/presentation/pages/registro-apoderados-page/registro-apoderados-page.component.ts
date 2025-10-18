import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// ========================================================================
// 1. INTERFACES Y TIPADO
// ========================================================================

/**
 * Interface que define la estructura de datos para el registro de un Apoderado.
 */
interface ApoderadoRegistro {
  // Paso 1: Identidad y Contacto
  dni: string;
  tipoDocumento: string;
  nombreCompleto: string;
  telefono: string;
  email: string;
  direccion: string;

  // Paso 2: Vínculo con Estudiante
  estudianteId: string; // Cód. SIAGIE o DNI del estudiante
  estudianteNombre: string; // Nombre autocompletado del estudiante
  tipoVinculo: 'Madre' | 'Padre' | 'Tutor Legal' | 'Apoderado Designado' | '';
  esResponsableFinanciero: 'Sí' | 'No' | '';

  // Paso 3: Seguridad y Documentación
  usuarioPortal: string; // Email para iniciar sesión
  passwordPortal: string;
  documentoDniCargado: boolean;
  documentoPoderCargado: boolean;
  aceptaCompromiso: boolean;
}

@Component({
  selector: 'app-registro-apoderados-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro-apoderados-page.component.html',
  styleUrl: './registro-apoderados-page.component.css'
})
export class RegistroApoderadosPageComponent {
  // Controla el paso visible en el Stepper (1, 2, o 3)
  currentStep: number = 1;

  // Objeto tipado para recolectar todos los datos del formulario
  formData: ApoderadoRegistro = {
    dni: '',
    tipoDocumento: 'DNI',
    nombreCompleto: '',
    telefono: '',
    email: '',
    direccion: '',

    estudianteId: '',
    estudianteNombre: '',
    tipoVinculo: '',
    esResponsableFinanciero: '',

    usuarioPortal: '',
    passwordPortal: '',
    documentoDniCargado: false,
    documentoPoderCargado: false,
    aceptaCompromiso: false
  };

  // Almacena mensajes de error para mostrar en el formulario
  validationErrors: string[] = [];

  // Simulación de los datos del estudiante encontrado (Paso 2)
  estudianteEncontrado: { id: string, nombre: string, grado: string, seccion: string } | null = null;


  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Inicialización del componente
  }

  // ========================================================================
  // 2. MÉTODOS DE NAVEGACIÓN Y CONTROL DEL STEPPER
  // ========================================================================

  /**
   * Navega directamente a un paso específico.
   * @param step Número del paso (1, 2 o 3).
   */
  goToStep(step: number): void {
    if (step >= 1 && step <= 3) {
      // Opcional: Podrías ejecutar validateCurrentStep() antes de permitir el goToStep
      this.currentStep = step;
      this.validationErrors = [];
    }
  }

  /**
   * Navega al siguiente paso después de validar el formulario actual.
   */
  nextStep(): void {
    if (this.validateCurrentStep()) {
      if (this.currentStep === 3) {
        this.finalizarRegistro();
      } else {
        this.currentStep++;
        this.validationErrors = [];

        // UX Mejora: Si avanza a Paso 3, precarga el email como usuario
        if (this.currentStep === 3) {
            this.formData.usuarioPortal = this.formData.email;
        }
      }
    }
  }

  /**
   * Navega al paso anterior o al listado si estamos en el paso 1.
   */
  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.validationErrors = [];
    } else {
      this.volverAlDirectorio();
    }
  }

  // ========================================================================
  // 3. LÓGICA DE BÚSQUEDA Y VALIDACIÓN
  // ========================================================================

  /**
   * Simula la búsqueda de un estudiante por ID/DNI para la vinculación.
   * En un proyecto real, esto llamaría a un servicio.
   * @param id Código o DNI ingresado.
   */
  buscarEstudiante(id: string): void {
      if (id && id.length > 5) {
          // Simulación de búsqueda exitosa
          this.estudianteEncontrado = {
              id: id,
              nombre: 'Ana Sofía Díaz',
              grado: '1ro',
              seccion: 'A'
          };
          this.formData.estudianteId = id;
          this.formData.estudianteNombre = 'Ana Sofía Díaz';
          alert(`Estudiante ${this.formData.estudianteNombre} encontrado y vinculado temporalmente.`);
      } else {
          this.estudianteEncontrado = null;
          this.formData.estudianteId = '';
          this.formData.estudianteNombre = '';
          alert('Estudiante no encontrado. Verifique el código/DNI.');
      }
  }

  /**
   * Realiza la validación de los campos obligatorios del paso actual.
   * @returns true si el paso es válido, false si no lo es.
   */
  private validateCurrentStep(): boolean {
    this.validationErrors = [];

    switch (this.currentStep) {
      case 1:
        // Validación Paso 1: Identidad y Contacto
        if (!this.formData.dni || this.formData.dni.length < 8) {
          this.validationErrors.push('El DNI debe tener al menos 8 dígitos.');
        }
        if (!this.formData.nombreCompleto || !this.formData.telefono || !this.formData.email) {
          this.validationErrors.push('Nombre completo, teléfono y email son obligatorios.');
        }
        if (!this.formData.email.includes('@')) {
           this.validationErrors.push('El correo electrónico no es válido.');
        }
        break;

      case 2:
        // Validación Paso 2: Vínculo con Estudiante
        if (!this.estudianteEncontrado || !this.formData.estudianteId) {
          this.validationErrors.push('Debe buscar y vincular un estudiante válido.');
        }
        if (!this.formData.tipoVinculo) {
          this.validationErrors.push('Debe especificar el tipo de vínculo (Madre, Padre, Tutor, etc.).');
        }
        if (!this.formData.esResponsableFinanciero) {
           this.validationErrors.push('Debe indicar si es el apoderado financiero/principal.');
        }
        break;

      case 3:
        // Validación Paso 3: Credenciales y Documentación
        if (!this.formData.usuarioPortal || !this.formData.passwordPortal) {
          this.validationErrors.push('El usuario y contraseña para el portal son obligatorios.');
        }
        if (!this.formData.documentoDniCargado) {
          this.validationErrors.push('La copia del DNI debe ser cargada.');
        }
        if (!this.formData.aceptaCompromiso) {
          this.validationErrors.push('Debe aceptar la Declaración Jurada y el Reglamento Interno.');
        }
        // Validación adicional si el vínculo es Tutor Legal
        if (this.formData.tipoVinculo === 'Tutor Legal' && !this.formData.documentoPoderCargado) {
             this.validationErrors.push('Para tutores legales, se requiere la Carta Poder Notarial.');
        }
        break;
    }

    return this.validationErrors.length === 0;
  }

  /**
   * Procesa la información final del formulario.
   */
  finalizarRegistro(): void {
    // Aquí se enviaría el objeto this.formData al servicio (API)
    console.log('✅ Registro de Apoderado Enviado:', this.formData);

    // Una vez enviado, navega al listado o muestra un mensaje de éxito
    alert('Apoderado registrado y vinculado exitosamente!');
    this.router.navigate(['/dashboard/lista_apoderados']);
  }

  /**
   * Vuelve a la página anterior en el historial (Directorio de Apoderados).
   */
  volverAlDirectorio(): void {
    this.location.back();
  }
}
