// src/app/admin/tipobonificaciones/tipobonificaciones.routes.ts
import { Route } from '@angular/router';

// ⇩ Componentes existentes en tu estructura
import { AlltipobonificacionesComponent } from './allTipoBonificaciones/alltipoBonificaciones.component';

// ⇩ Agrega los otros componentes cuando los crees
//import { AddTipobonificacionComponent }   from './addTipobonificacion/addTipobonificacion.component';
//import { EditTipobonificacionComponent }  from './editTipobonificacion/editTipobonificacion.component';
//import { TipobonificacionProfileComponent } from './tipobonificacionProfile/tipobonificacionProfile.component';

import { Page404Component } from '../../authentication/page404/page404.component';
import { AddTipobonificacionComponent } from './add-tipobonificaciones/add-tipobonificaciones.component';

/**
 * Rutas del feature Tipobonificaciones
 *  /admin/tipobonificaciones           → lista
 *  /admin/tipobonificaciones/nuevo     → alta
 *  /admin/tipobonificaciones/editar/1  → edición
 *  /admin/tipobonificaciones/1         → detalle
 */
export const ADMIN_TIPOBONIFICACIONES_ROUTE: Route[] = [
  {
    path: 'alltipobonificaciones',
    component: AlltipobonificacionesComponent,
  },
    {
        path: 'add-tipobonificaciones',
        component: AddTipobonificacionComponent,
      },
];
