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
  }
];

