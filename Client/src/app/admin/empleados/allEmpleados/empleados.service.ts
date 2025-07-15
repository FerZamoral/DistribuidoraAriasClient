import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GenericService } from '@shared/generic.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private readonly endpoint = 'Empleados';

  constructor(private genericService: GenericService) {}

  /** GET: Fetch all empleados */
  getAll(): Observable<any> {
    return this.genericService.list(this.endpoint).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error fetching empleados', err);
        return throwError(() => err);
      })
    );
  }

  /** POST: Add a new empleado */
  add(empleado: Partial<any>): Observable<any> {
    return this.genericService.create(this.endpoint, empleado).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error adding empleado', err);
        return throwError(() => err);
      })
    );
  }

  /** PUT: Update an existing empleado */
  update(empleado: any): Observable<any> {
    return this.genericService.update(this.endpoint, empleado).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error updating empleado', err);
        return throwError(() => err);
      })
    );
  }

  /** DELETE: Delete an empleado */
  delete(id: number): Observable<any> {
    return this.genericService.delete(this.endpoint, id).pipe(
      catchError(err => {
        console.error('Error deleting empleado', err);
        return throwError(() => err);
      })
    );
  }

  /** PUT: Change estado (logical delete) */
  cambiarEstado(id: number): Observable<void> {
    return this.genericService.patch<void>(`${this.endpoint}/inactivar/${id}`, {}).pipe(
      catchError(err => {
        console.error('Error cambiando estado del empleado', err);
        return throwError(() => err);
      })
    );
  }
}
