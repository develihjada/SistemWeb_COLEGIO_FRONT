import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common'; // Para la función 'back'

/**
 * Interface que define la estructura de datos del empleado.
 * Esto asegura que la recolección de datos sea tipada y predecible.
 */
interface Empleado {
  // Paso 1: Datos Personales
  dni: string;
  fechaNacimiento: Date | null;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  email: string;

  // Paso 2: Información Laboral
  cargo: string;
  area: string;
  condicionLaboral: 'Nombrado' | 'Contratado' | 'Servicios' | '';
  fechaIngreso: Date | null;
  sueldoBase: number | null;
  regimenPensionario: 'ONP' | 'AFP' | 'No Aplica' | '';

  // Paso 3: Documentación (se simula la carga con un booleano)
  cvCargado: boolean;
  contratoCargado: boolean;
  dniRucCargado: boolean;
  aceptaTerminos: boolean;
}

@Component({
  selector: 'app-registro-empleados-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro-empleados-page.component.html',
  styleUrl: './registro-empleados-page.component.css'
})
export class RegistroEmpleadosPageComponent {
  // Estado que controla el paso visible en el Stepper (1, 2, o 3)
  currentStep: number = 1;

  // Objeto tipado para recolectar todos los datos del formulario
  formData: Empleado = {
    // Inicialización de campos
    dni: '',
    fechaNacimiento: null,
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: '',

    cargo: '',
    area: '',
    condicionLaboral: '',
    fechaIngreso: null,
    sueldoBase: null,
    regimenPensionario: '',

    cvCargado: false,
    contratoCargado: false,
    dniRucCargado: false,
    aceptaTerminos: false
  };

  // Variable para manejar errores de validación por paso
  validationErrors: string[] = [];

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Aquí podrías cargar datos iniciales si fuera necesario
  }

  // --- Métodos de Navegación del Stepper ---

  /**
   * Navega a un paso específico si se hace click en el Stepper.
   * @param step Número del paso (1, 2 o 3).
   */
  goToStep(step: number): void {
    // Opcional: Podrías validar que los pasos anteriores estén completos antes de permitir la navegación.
    if (step >= 1 && step <= 3) {
      this.currentStep = step;
    }
  }

  /**
   * Navega al siguiente paso después de validar el formulario actual.
   */
  nextStep(): void {
    if (this.validateCurrentStep()) {
      // Si estamos en el último paso (3), finalizamos.
      if (this.currentStep === 3) {
        this.finalizarRegistro();
      } else {
        // Si no es el último paso, avanzamos.
        this.currentStep++;
        this.validationErrors = []; // Limpia errores al avanzar
      }
    }
  }

  /**
   * Navega al paso anterior.
   */
  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.validationErrors = []; // Limpia errores al retroceder
    } else {
      // Si está en el primer paso, vuelve al listado
      this.volverListaEmpleados();
    }
  }

  /**
   * Simula la validación de los campos obligatorios del paso actual.
   * En Angular real, se usarían `FormGroup` y `FormBuilder`.
   * @returns true si el paso es válido, false si no lo es.
   */
  private validateCurrentStep(): boolean {
    this.validationErrors = [];

    switch (this.currentStep) {
      case 1:
        // Validación Paso 1: Datos Personales
        if (!this.formData.dni || this.formData.dni.length !== 8) {
          this.validationErrors.push('El DNI debe tener 8 dígitos.');
        }
        if (!this.formData.nombres || !this.formData.apellidos || !this.formData.direccion) {
          this.validationErrors.push('Nombres, Apellidos y Dirección son obligatorios.');
        }
        break;

      case 2:
        // Validación Paso 2: Información Laboral
        if (!this.formData.cargo || !this.formData.area || !this.formData.condicionLaboral) {
          this.validationErrors.push('Cargo, Área y Condición Laboral son obligatorios.');
        }
        if (!this.formData.fechaIngreso) {
          this.validationErrors.push('La Fecha de Ingreso es obligatoria.');
        }
        if (this.formData.sueldoBase === null || this.formData.sueldoBase <= 0) {
           this.validationErrors.push('El Sueldo Base debe ser un valor válido.');
        }
        break;

      case 3:
        // Validación Paso 3: Documentación
        if (!this.formData.cvCargado || !this.formData.contratoCargado) {
          this.validationErrors.push('Debe cargar el CV y el Contrato firmado.');
        }
        if (!this.formData.aceptaTerminos) {
          this.validationErrors.push('Debe certificar la veracidad de la documentación.');
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
    console.log('✅ Registro de Empleado Enviado:', this.formData);

    // Una vez enviado, navega a la lista o muestra un mensaje de éxito
    alert('Empleado registrado exitosamente!');
    this.router.navigate(['/lista_empleados']);
  }

  /**
   * Vuelve a la página anterior en el historial (simulando 'Atrás').
   */
  volverListaEmpleados(): void {
    this.location.back();
  }

  // --- Métodos Adicionales para el HTML ---

  // Método simple para simular la carga de un archivo y actualizar el estado
  onFileChange(fileType: keyof Empleado, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // En un caso real, aquí se subiría el archivo a un servidor.
      // Para simular, marcamos la propiedad como true.
      (this.formData as any)[fileType] = true;
      console.log(`Documento ${fileType} marcado como cargado.`);
    } else {
      (this.formData as any)[fileType] = false;
    }
  }
}
