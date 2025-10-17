import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// Interfaces para tipado
interface MenuItem {
  name: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  roles: UserRole[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
  roles: UserRole[];
}

enum UserRole {
  ADMINISTRADOR = 'administrador',
  DOCENTE = 'docente',
  PADRE_FAMILIA = 'padre_familia',
  PERSONAL_ADMINISTRATIVO = 'personal_administrativo',
}

@Component({
  selector: 'app-inicio-page',
  imports: [RouterLink],
  templateUrl: './inicio-page.html',
  styleUrl: './inicio-page.css',
})
export class InicioPage {
  private route = inject(Router);

  readonly versionSystem: string = 'v1.0.0';
  readonly rutaPrincipal: string = '';

  // Simulación del rol actual del usuario (esto vendría del servicio de autenticación)
  currentUserRole: UserRole = UserRole.ADMINISTRADOR;

  menuSections: MenuSection[] = [
    {
      title: 'Módulo Académico',
      roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
      items: [
        {
          name: 'Matrícula',
          icon: 'ti ti-list',
          route: `/${this.rutaPrincipal}/lista_matricula`,
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Evaluaciones y notas',
          icon: 'ti ti-list',
          route: '/estudiantes/lista',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Asistencia de alumnos',
          icon: 'ti ti-plus',
          route: '/estudiantes/registro',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Contenido/Recursos Educativos',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Horarios',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Comunicaciones',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
      ],
    },
    {
      title: 'Módulo Administrativo y de Gestión de RR.HH',
      roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
      items: [
        {
          name: 'Registro y seguimiento de activos',
          icon: 'ti ti-list',
          route: '/estudiantes/lista',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Gestión de suministros',
          icon: 'ti ti-plus',
          route: '/estudiantes/registro',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Recursos Humanos',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Gestión de Contratos y Cargos',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Gestión de Licencias y Vacaciones',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Control de Expedientes',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Comunicación Interna',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
      ],
    },
    {
      title: 'Módulo de Pagos / Finanzas y Cobranzas',
      roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
      items: [
        {
          name: 'Tipos de pago',
          icon: 'ti ti-list',
          route: '/estudiantes/lista',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Generación de recibos y facturas',
          icon: 'ti ti-plus',
          route: '/estudiantes/registro',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Seguimiento de deudas y morosos',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Gestión de descuentos y becas',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Integración con métodos de pago',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Nómina ',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Cálculo y gestión de salarios de docentes y administrativos',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Gestión de deducciones e impuestos',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
      ],
    },
    {
      title: 'Módulo de Comunicación y Portal para Padres',
      roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
      items: [
        {
          name: 'Consulta de notas y promedios',
          icon: 'ti ti-list',
          route: '/estudiantes/lista',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Consulta de horarios',
          icon: 'ti ti-plus',
          route: '/estudiantes/registro',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Consulta de estado de pagos y deudas',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Consulta de asistencia',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Acceso a recursos educativos y tareas',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
      ],
    },
    {
      title: 'Módulo de Comunicación y Portal para docentes',
      roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
      items: [
        {
          name: 'Registro de notas',
          icon: 'ti ti-list',
          route: '/estudiantes/lista',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Registro de asistencia de alumnos',
          icon: 'ti ti-plus',
          route: '/estudiantes/registro',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Subida de materiales de clase',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Consulta de horarios y grupos asignados',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
      ],
    },
    {
      title: 'Módulo de Configuración y Seguridad',
      roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
      items: [
        {
          name: 'Logo, datos de contacto de la escuela.',
          icon: 'ti ti-list',
          route: '/estudiantes/lista',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Años y niveles de estudio',
          icon: 'ti ti-plus',
          route: '/estudiantes/registro',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
        },
        {
          name: 'Catálogos',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Auditoría de Acciones',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Gestión de Contraseñas y Políticas de Seguridad.',
          icon: 'ti ti-heart',
          route: '/estudiantes/contenido-recursos',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
        {
          name: 'Empleados',
          icon: 'ti ti-heart',
          route: '/lista-empleados',
          roles: [UserRole.ADMINISTRADOR, UserRole.PADRE_FAMILIA],
        },
      ],
    },
  ];


  // Filtrar secciones del menú según el rol actual
  getVisibleMenuSections(): MenuSection[] {
    return this.menuSections.filter(section =>
      section.roles.includes(this.currentUserRole)
    );
  }

  // Filtrar items de menú según el rol actual
  getVisibleMenuItems(items: MenuItem[]): MenuItem[] {
    return items.filter(item =>
      item.roles.includes(this.currentUserRole)
    ).map(item => ({
      ...item,
      children: item.children ? this.getVisibleMenuItems(item.children) : undefined
    }));
  }

  // Método para cambiar el rol (para testing)
  setUserRole(role: UserRole): void {
    this.currentUserRole = role;
  }

  // Métodos de utilidad para el HTML
  hasVisibleChildren(item: MenuItem): boolean {
    if (!item.children) return false;
    return this.getVisibleMenuItems(item.children).length > 0;
  }

  // Método para obtener el nombre amigable del rol
  getRoleDisplayName(role: UserRole): string {
    const roleNames = {
      [UserRole.ADMINISTRADOR]: 'Administrador',
      [UserRole.DOCENTE]: 'Docente',
      [UserRole.PADRE_FAMILIA]: 'Padre de Familia',
      [UserRole.PERSONAL_ADMINISTRATIVO]: 'Personal Administrativo'
    };
    return roleNames[role];
  }

  // Método helper para limpiar nombres de menú para IDs
  cleanMenuName(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '');
  }

  // ========================================================================
  // Datos simulacion alumnos faltantes
  // ========================================================================

  alumnos = [
    {
      nombre: 'Carlos Huamán',
      grado: '5to Grado',
      seccion: 'B',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      nombre: 'Carlos Huamán',
      grado: '5to Grado',
      seccion: 'B',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      nombre: 'Carlos Huamán',
      grado: '5to Grado',
      seccion: 'B',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      nombre: 'Carlos Huamán',
      grado: '5to Grado',
      seccion: 'B',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      nombre: 'Carlos Huamán',
      grado: '5to Grado',
      seccion: 'B',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  ];

  mostrarTodos = false;

  get alumnosMostrados() {
    return this.mostrarTodos ? this.alumnos : this.alumnos.slice(0, 3);
  }

  verMas() {
    this.mostrarTodos = true;
  }


  // ========================================================================
  // Salir del sistema
  // ========================================================================


  logout(): void {
    this.route.navigate(['/login']);
  }
}
