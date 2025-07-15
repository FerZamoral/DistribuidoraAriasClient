// src/app/services/tipobonificaciones.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GenericService } from '@shared/generic.service';
import { Tipobonificacion } from './tipoBonificaciones.model';

 // Adjust the import path as necessary

@Injectable({
  providedIn: 'root',
})
export class TipobonificacionesService {
  /** Endpoint base que tu backend expone, p. ej. /api/Tipobonificacion */
  private readonly endpoint = 'TipoBonificaciones';

  constructor(private genericService: GenericService) {}

  /** GET: obtener todas las tipobonificaciones */
  getAll(): Observable<any> {
    return this.genericService.list(this.endpoint).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error fetching tipobonificaciones', err);
        return throwError(() => err);
      })
    );
  }

  /** POST: crear una nueva tipobonificación */
  add(tipobonificacion: Partial<any>): Observable<any> {
    // Si tu API espera /crear o alguna sub‑ruta, ajústala aquí:
    return this.genericService.create(`${this.endpoint}`, tipobonificacion).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error adding tipobonificacion', err);
        return throwError(() => err);
      })
    );
  }

  /** PUT: actualizar una tipobonificación existente */
  update(tipobonificacion: any): Observable<any> {
    return this.genericService.update(this.endpoint, tipobonificacion).pipe(
      map((res: any) => res as Tipobonificacion),
      catchError(err => {
        console.error('Error updating tipobonificacion', err);
        return throwError(() => err);
      })
    );
  }
/** DELETE: eliminar del backend */
delete(id: number): Observable<void> {
  return this.genericService.delete<void>(`${this.endpoint}/${id}`).pipe(
    catchError(err => {
      console.error('Error eliminando tipobonificación', err);
      return throwError(() => err);
    })
  );
}

}
