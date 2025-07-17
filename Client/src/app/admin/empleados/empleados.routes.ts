import { Route } from '@angular/router';
import { Page404Component } from '../../authentication/page404/page404.component';
import { AllEmpleadosComponent } from './allEmpleados/allempleados.component';
import { AddEmpleadoComponent } from './add-empleado/add-empleado.component';

export const ADMIN_EMPLEADO_ROUTE: Route[] = [
  {
    path: 'allEmpleados',
    component: AllEmpleadosComponent,
  },
  {
      path: 'add-empleado',
      component: AddEmpleadoComponent,
  },
  { path: '**', component: Page404Component },
];
