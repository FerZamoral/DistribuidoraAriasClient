import { Route } from '@angular/router';
import { Page404Component } from '../../authentication/page404/page404.component';
import { AllEmpleadosComponent } from './allEmpleados/allempleados.component';

export const ADMIN_EMPLEADO_ROUTE: Route[] = [
  {
    path: 'allEmpleados',
    component: AllEmpleadosComponent,
  },
  { path: '**', component: Page404Component },
];
