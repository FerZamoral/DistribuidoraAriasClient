import { Route } from '@angular/router';

export const ADMIN_ROUTE: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.ADMIN_DASHBOARD_ROUTE),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.routes').then((m) => m.ADMIN_USUARIO_ROUTE),
  },
   {
    path: 'tipobonificaciones',
    loadChildren: () =>
      import('./tipobonificaciones/tipobonificaciones.routes').then((m) => m.ADMIN_TIPOBONIFICACIONES_ROUTE),
  },
   {
    path: 'tipodeducciones',
    loadChildren: () =>
      import('./tipoDeducciones/tipoDeduccion.routes').then(m => m.ADMIN_TIPODEDUCCIONES_ROUTE),
  },
  {
    path: 'empleados',
    loadChildren: () =>
      import('./empleados/empleados.routes').then((m) => m.ADMIN_EMPLEADO_ROUTE),
  },
  {
    path: 'ausencias',
    loadChildren: () =>
      import('./ausencias/ausencias.routes').then((m) => m.ADMIN_AUSENCIAS_ROUTE),
  }

];

