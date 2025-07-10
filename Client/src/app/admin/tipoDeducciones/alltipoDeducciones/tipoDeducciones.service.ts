// src/app/services/tipo-deducciones.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GenericService } from '@shared/generic.service';
import { TipoDeduccion } from './tipoDeducciones.model';

@Injectable({
  providedIn: 'root',
})
export class TipoDeduccionesService {
  private readonly endpoint = 'TipoDeducciones';

  constructor(private genericService: GenericService) {}

  getAll(): Observable<any> {
    return this.genericService.list(this.endpoint).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error fetching tipobonificaciones', err);
        return throwError(() => err);
      })
    );
  }


  add(tipoDeduccion: Partial<any>): Observable<any> {
    return this.genericService.create(`${this.endpoint}`, tipoDeduccion).pipe(
       map((res: any) => res as any),
      catchError(err => {
        console.error('Error adding tipoDeduccion', err);
        return throwError(() => err);
      })
    );
  }

  update(tipoDeduccion: any): Observable<any> {
    return this.genericService.update(this.endpoint, tipoDeduccion).pipe(
      map((res: any) => res as TipoDeduccion),
      catchError(err => {
        console.error('Error updating tipoDeduccion', err);
        return throwError(() => err);
      })
    );
  }
/** DELETE: eliminar del backend */
delete(id: number): Observable<void> {
  return this.genericService.delete<void>(`${this.endpoint}/${id}`).pipe(
    catchError(err => {
      console.error('Error eliminando tipo de deducción', err);
      return throwError(() => err);
    })
  );
}

}
