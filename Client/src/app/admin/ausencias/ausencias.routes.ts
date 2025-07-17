import { Route } from '@angular/router';
import { AllAusenciasComponent } from './allAusencias/allausencias.component';
import { Page404Component } from '../../authentication/page404/page404.component';
import { AddAusenciaComponent } from './add-ausencia/add-ausencia.component';

export const ADMIN_AUSENCIAS_ROUTE: Route[] = [
  {
    path: 'allAusencias',
    component: AllAusenciasComponent,
  },
  {
    path: 'add-ausencia',
    component: AddAusenciaComponent,
  },
  { path: '**', component: Page404Component },
];
