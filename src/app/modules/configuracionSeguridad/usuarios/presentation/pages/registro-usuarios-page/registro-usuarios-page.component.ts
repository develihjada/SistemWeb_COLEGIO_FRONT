import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

/**
 * Interface que define la estructura de datos para el registro de un nuevo Usuario.
 * Enfocado en la identidad, credenciales y permisos.
 */
interface UsuarioRegistro {
  // Paso 1: Identificación y Vínculo
  dni: string;
  nombreCompleto: string; // Se autocompleta tras buscar DNI
  vinculoTipo: 'Empleado' | 'Apoderado' | 'Administrador Externo' | '';
  vinculoId: string; // DNI del empleado o Código del estudiante

  // Paso 2: Datos de Acceso
  email: string;
  password: string;
  confirmPassword: string;

  // Paso 3: Asignación de Roles
  rolPrimario: 'Apoderado' | 'Docente' | 'Administrativo' | 'Director/a' | 'Super Administrador' | '';
  permisosModulos: {
    matriculas: boolean;
    personal: boolean;
    notas: boolean;
    usuarios: boolean;
    finanzas: boolean;
  };
  estadoInicial: 'Activo' | 'Pendiente de Activación' | 'Bloqueado' | '';
}

@Component({
  selector: 'app-registro-usuarios-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro-usuarios-page.component.html',
  styleUrls: ['./registro-usuarios-page.component.css']
})
export class RegistroUsuariosPageComponent {
  // Controla el paso visible en el Stepper (1, 2, o 3)
  currentStep: number = 1;

  // Objeto tipado para recolectar todos los datos del formulario
  formData: UsuarioRegistro = {
    dni: '',
    nombreCompleto: '',
    vinculoTipo: '',
    vinculoId: '',

    email: '',
    password: '',
    confirmPassword: '',

    rolPrimario: '',
    permisosModulos: {
      matriculas: false,
      personal: false,
      notas: false,
      usuarios: false,
      finanzas: false
    },
    estadoInicial: 'Pendiente de Activación'
  };

  // Almacena mensajes de error para mostrar en el formulario
  validationErrors: string[] = [];

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Inicialización del componente
  }

  // --- Métodos de Navegación del Stepper ---

  /**
   * Navega directamente a un paso específico.
   * @param step Número del paso (1, 2 o 3).
   */
  goToStep(step: number): void {
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
   * Navega al paso anterior o al listado si estamos en el paso 1.
   */
  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.validationErrors = []; // Limpia errores al retroceder
    } else {
      this.volverListaUsuarios();
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
        // Validación Paso 1: Identificación y Vínculo
        if (!this.formData.dni || this.formData.dni.length < 8) {
          this.validationErrors.push('El DNI debe ser válido y es obligatorio.');
        }
        if (!this.formData.nombreCompleto || this.formData.nombreCompleto === '[Autocompletado]') {
          this.validationErrors.push('Debe completar el DNI para identificar a la persona.');
        }
        if (!this.formData.vinculoTipo || !this.formData.vinculoId) {
          this.validationErrors.push('El Tipo de Vínculo y el ID de Vínculo son obligatorios.');
        }
        break;

      case 2:
        // Validación Paso 2: Datos de Acceso
        if (!this.formData.email || !this.formData.email.includes('@')) {
          this.validationErrors.push('Ingrese un correo electrónico válido.');
        }
        if (this.formData.password.length < 8) {
          this.validationErrors.push('La contraseña debe tener al menos 8 caracteres.');
        }
        if (this.formData.password !== this.formData.confirmPassword) {
          this.validationErrors.push('La Contraseña y la Confirmación no coinciden.');
        }
        break;

      case 3:
        // Validación Paso 3: Asignación de Roles
        if (!this.formData.rolPrimario) {
          this.validationErrors.push('Debe asignar un Rol Primario al usuario.');
        }
        // No se requiere que seleccionen permisos específicos, pero el rol sí.
        break;
    }

    return this.validationErrors.length === 0;
  }

  /**
   * Procesa la información final del formulario y envía el registro.
   */
  finalizarRegistro(): void {
    // 1. Re-validación final por seguridad
    if (!this.validateCurrentStep()) {
        alert('Revise los errores antes de finalizar.');
        return;
    }

  // 2. Aquí se realizaría la llamada al Servicio (API)
  // Construir el obje to a enviar sin el campo confirmPassword
  const { confirmPassword, ...dataToSend } = this.formData;

  console.log('✅ Creación de Usuario Enviada:', dataToSend);

    // 3. Navegación post-registro
    alert('Usuario creado y permisos asignados exitosamente!');
    this.router.navigate(['/lista_usuarios']);
  }

  /**
   * Vuelve a la página anterior en el historial.
   */
  volverListaUsuarios(): void {
    this.location.back();
  }

  /**
   * Simulación de autocompletado de nombre tras ingresar un DNI.
   * (Esta lógica debería vivir en un servicio que consulta una base de datos/API).
   */
  buscarPersonaPorDni(): void {
    if (this.formData.dni.length === 8) {
      this.formData.nombreCompleto = 'Pérez Rojas, Ana Sofía'; // Ejemplo de datos simulados
      console.log('Nombre autocompletado.');
    } else {
      this.formData.nombreCompleto = '';
    }
  }
}
