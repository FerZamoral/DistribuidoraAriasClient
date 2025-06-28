import { Route } from '@angular/router';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { Page404Component } from '../../authentication/page404/page404.component';

import { EditEmployeeComponent } from './edit-usuario/edit-employee.component';
import { EmployeeProfileComponent } from './usuario-profile/employee-profile.component';
import { AllusuariosComponent } from './allUsuarios/allusuarios.component';

export const ADMIN_USUARIO_ROUTE: Route[] = [
  {
    path: 'allUsuarios',
    component: AllusuariosComponent,
  },
  {
    path: 'add-usuario',
    component: AddUsuarioComponent,
  },
  {
    path: 'edit-usuario/:id',
    component: EditEmployeeComponent,
  },
  // {
  //   path: 'usuario-shift',
  //   component: UsuarioShiftComponent,
  // },
  {
    path: 'usuario-profile',
    component: EmployeeProfileComponent,
  },
  { path: '**', component: Page404Component },
];
