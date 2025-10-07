import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  PERSONAL_ADMINISTRATIVO = 'personal_administrativo'
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  private readonly router = inject(Router);

  readonly versionSystem: string = 'v1.0.0';
  readonly rutaPrincipal: string = '';

  // Simulación del rol actual del usuario (esto vendría del servicio de autenticación)
  currentUserRole: UserRole = UserRole.ADMINISTRADOR;

  // Estructura completa del menú organizada por secciones y roles
  menuSections: MenuSection[] = [
    {
      title: 'Gestión Académica',
      roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
      items: [
        {
          name: 'Estudiantes',
          icon: 'ti ti-users',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO, UserRole.PADRE_FAMILIA],
          children: [
            {
              name: 'Lista',
              icon: 'ti ti-list',
              route: '/estudiantes/lista',
              roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Registro',
              icon: 'ti ti-plus',
              route: '/estudiantes/registro',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Mis Hijos',
              icon: 'ti ti-heart',
              route: '/estudiantes/mis-hijos',
              roles: [UserRole.PADRE_FAMILIA]
            }
          ]
        },
        {
          name: 'Docentes',
          icon: 'ti ti-user-check',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
          children: [
            {
              name: 'Lista',
              icon: 'ti ti-list',
              route: '/docentes/lista',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Registro',
              icon: 'ti ti-plus',
              route: '/docentes/registro',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            }
          ]
        },
        {
          name: 'Clases/Aulas',
          icon: 'ti ti-chalkboard',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
          children: [
            {
              name: 'Todas las Clases',
              icon: 'ti ti-list',
              route: '/clases/lista',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Mis Clases',
              icon: 'ti ti-user',
              route: '/clases/mis-clases',
              roles: [UserRole.DOCENTE]
            },
            {
              name: 'Nueva Clase',
              icon: 'ti ti-plus',
              route: '/clases/registro',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            }
          ]
        },
        {
          name: 'Niveles y Secciones',
          icon: 'ti ti-hierarchy',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
          children: [
            {
              name: 'Niveles',
              icon: 'ti ti-stairs',
              route: '/niveles/lista',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Secciones',
              icon: 'ti ti-grid-dots',
              route: '/secciones/lista',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            }
          ]
        },
        {
          name: 'Matrícula',
          icon: 'ti ti-school',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
          children: [
            {
              name: 'Proceso de Matrícula',
              icon: 'ti ti-file-plus',
              route: '/matricula/proceso',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Lista de Matriculados',
              icon: 'ti ti-list-check',
              route: '/matricula/lista',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Documentos Pendientes',
              icon: 'ti ti-file-alert',
              route: '/matricula/documentos-pendientes',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Asignación de Aulas',
              icon: 'ti ti-building',
              route: '/matricula/asignacion-aulas',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            }
          ]
        }
      ]
    },
    {
      title: 'Gestión Administrativa',
      roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
      items: [
        {
          name: 'Apoderados',
          icon: 'ti ti-user-heart',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
          children: [
            {
              name: 'Lista',
              icon: 'ti ti-list',
              route: '/ADMINISTRATIVOS_APODERADOS',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            }
          ]
        },
        {
          name: 'Personal',
          icon: 'ti ti-users-group',
          roles: [UserRole.ADMINISTRADOR],
          children: [
            {
              name: 'Lista de Personal',
              icon: 'ti ti-list',
              route: '/personal/lista',
              roles: [UserRole.ADMINISTRADOR]
            },
            {
              name: 'Registro de Personal',
              icon: 'ti ti-plus',
              route: '/personal/registro',
              roles: [UserRole.ADMINISTRADOR]
            }
          ]
        },
        {
          name: 'Usuarios y Accesos',
          icon: 'ti ti-user-circle',
          roles: [UserRole.ADMINISTRADOR],
          children: [
            {
              name: 'Usuarios',
              icon: 'ti ti-users',
              route: '/usuarios/lista',
              roles: [UserRole.ADMINISTRADOR]
            },
            {
              name: 'Roles y Permisos',
              icon: 'ti ti-shield',
              route: '/usuarios/roles',
              roles: [UserRole.ADMINISTRADOR]
            }
          ]
        }
      ]
    },
    {
      title: 'Evaluaciones y Notas',
      roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PADRE_FAMILIA],
      items: [
        {
          name: 'Notas',
          icon: 'ti ti-report',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PADRE_FAMILIA],
          children: [
            {
              name: 'Registro de Notas',
              icon: 'ti ti-edit',
              route: '/notas/registro',
              roles: [UserRole.DOCENTE]
            },
            {
              name: 'Consolidado General',
              icon: 'ti ti-chart-bar',
              route: '/notas/consolidado',
              roles: [UserRole.ADMINISTRADOR]
            },
            {
              name: 'Notas de mis Hijos',
              icon: 'ti ti-heart',
              route: '/notas/mis-hijos',
              roles: [UserRole.PADRE_FAMILIA]
            }
          ]
        },
        {
          name: 'Asistencias',
          icon: 'ti ti-calendar-check',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PADRE_FAMILIA],
          children: [
            {
              name: 'Registro de Asistencia',
              icon: 'ti ti-check',
              route: '/asistencias/registro',
              roles: [UserRole.DOCENTE]
            },
            {
              name: 'Reportes de Asistencia',
              icon: 'ti ti-chart-line',
              route: '/asistencias/reportes',
              roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE]
            },
            {
              name: 'Asistencia de mis Hijos',
              icon: 'ti ti-heart',
              route: '/asistencias/mis-hijos',
              roles: [UserRole.PADRE_FAMILIA]
            }
          ]
        }
      ]
    },
    {
      title: 'Comunicaciones',
      roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PADRE_FAMILIA, UserRole.PERSONAL_ADMINISTRATIVO],
      items: [
        {
          name: 'Notificaciones',
          icon: 'ti ti-bell',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PADRE_FAMILIA, UserRole.PERSONAL_ADMINISTRATIVO],
          children: [
            {
              name: 'Enviar Notificación',
              icon: 'ti ti-send',
              route: '/comunicaciones/enviar',
              roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Mis Notificaciones',
              icon: 'ti ti-inbox',
              route: '/comunicaciones/bandeja',
              roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PADRE_FAMILIA, UserRole.PERSONAL_ADMINISTRATIVO]
            }
          ]
        },
        {
          name: 'Reuniones',
          icon: 'ti ti-users',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PADRE_FAMILIA, UserRole.PERSONAL_ADMINISTRATIVO],
          children: [
            {
              name: 'Programar Reunión',
              icon: 'ti ti-calendar-plus',
              route: '/reuniones/programar',
              roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Mis Reuniones',
              icon: 'ti ti-calendar',
              route: '/reuniones/mis-reuniones',
              roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PADRE_FAMILIA, UserRole.PERSONAL_ADMINISTRATIVO]
            }
          ]
        }
      ]
    },
    {
      title: 'Reportes',
      roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
      items: [
        {
          name: 'Reportes Académicos',
          icon: 'ti ti-chart-bar',
          roles: [UserRole.ADMINISTRADOR, UserRole.DOCENTE, UserRole.PERSONAL_ADMINISTRATIVO],
          children: [
            {
              name: 'Rendimiento Académico',
              icon: 'ti ti-trending-up',
              route: '/reportes/rendimiento',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Reporte de Clases',
              icon: 'ti ti-chalkboard',
              route: '/reportes/clases',
              roles: [UserRole.DOCENTE]
            }
          ]
        },
        {
          name: 'Reportes Administrativos',
          icon: 'ti ti-file-text',
          roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO],
          children: [
            {
              name: 'Matrícula',
              icon: 'ti ti-school',
              route: '/reportes/matricula',
              roles: [UserRole.ADMINISTRADOR, UserRole.PERSONAL_ADMINISTRATIVO]
            },
            {
              name: 'Personal',
              icon: 'ti ti-users-group',
              route: '/reportes/personal',
              roles: [UserRole.ADMINISTRADOR]
            }
          ]
        }
      ]
    },
    {
      title: 'Configuración',
      roles: [UserRole.ADMINISTRADOR],
      items: [
        {
          name: 'Catálogos',
          icon: 'ti ti-category',
          roles: [UserRole.ADMINISTRADOR],
          children: [
            {
              name: 'Materias',
              icon: 'ti ti-book-2',
              route: '/catalogos/materias',
              roles: [UserRole.ADMINISTRADOR]
            },
            {
              name: 'Períodos Académicos',
              icon: 'ti ti-calendar',
              route: '/catalogos/periodos',
              roles: [UserRole.ADMINISTRADOR]
            },
            {
              name: 'Tipos de Evaluación',
              icon: 'ti ti-clipboard-check',
              route: '/catalogos/tipos-evaluacion',
              roles: [UserRole.ADMINISTRADOR]
            }
          ]
        },
        {
          name: 'Sistema',
          icon: 'ti ti-settings',
          roles: [UserRole.ADMINISTRADOR],
          children: [
            {
              name: 'Tipo Documentos',
              icon: 'ti ti-adjustments',
              route: `/${this.rutaPrincipal}/tipodocumentos`,
              roles: [UserRole.ADMINISTRADOR]
            },
            {
              name: 'Configuración General',
              icon: 'ti ti-adjustments',
              route: '/CONFIGURACION_SISTEMA',
              roles: [UserRole.ADMINISTRADOR]
            },
            {
              name: 'Respaldos',
              icon: 'ti ti-database',
              route: '/sistema/respaldos',
              roles: [UserRole.ADMINISTRADOR]
            }
          ]
        }
      ]
    }
  ];

  ngOnInit(): void {
    // Aquí podrías obtener el rol del usuario desde un servicio de autenticación
    // this.currentUserRole = this.authService.getCurrentUserRole();
  }

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

  // Método para obtener la clase CSS del color del borde según el título de la sección
  getSectionColorClass(sectionTitle: string): string {
    const colorMap: { [key: string]: string } = {
      'Gestión Académica': 'menu-subtitle_group_academic',
      'Gestión Administrativa': 'menu-subtitle_group_admin',
      'Evaluaciones y Notas': 'menu-subtitle_group_evaluation',
      'Comunicaciones': 'menu-subtitle_group_communication',
      'Reportes': 'menu-subtitle_group_reports',
      'Configuración': 'menu-subtitle_group_config'
    };
    return colorMap[sectionTitle] || 'menu-subtitle_group_default';
  }
}
