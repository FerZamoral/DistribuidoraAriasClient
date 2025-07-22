import { Route } from '@angular/router';

// ⇩ Componentes existentes
import { AllTipoDeduccionesComponent } from './alltipoDeducciones/alltipoDeducciones.component';

// ⇩ Agrega estos cuando estén listos
// import { AddTipodeduccionComponent } from './addTipodeduccion/addTipodeduccion.component';
// import { EditTipodeduccionComponent } from './editTipodeduccion/editTipodeduccion.component';
// import { TipodeduccionProfileComponent } from './tipodeduccionProfile/tipodeduccionProfile.component';

import { Page404Component } from '../../authentication/page404/page404.component';
import { AddTipoDeduccionComponent } from './add-tipoDeducciones/add-tipoDeducciones.component';

/**
 * Rutas del feature TipoDeducciones
 *  /admin/tipodeducciones            → lista
 *  /admin/tipodeducciones/nuevo     → alta
 *  /admin/tipodeducciones/editar/1  → edición
 *  /admin/tipodeducciones/1         → detalle
 */
export const ADMIN_TIPODEDUCCIONES_ROUTE: Route[] = [
  {
    path: 'alltipodeducciones',
    component: AllTipoDeduccionesComponent,
  },
    {
      path: 'add-tipoDeducciones',
      component: AddTipoDeduccionComponent,
    },
  // { path: 'nuevo', component: AddTipodeduccionComponent },
  // { path: 'editar/:id', component: EditTipodeduccionComponent },
  // { path: ':id', component: TipodeduccionProfileComponent },
  { path: '**', component: Page404Component },
];
