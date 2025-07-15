// src/app/services/ausencias.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GenericService } from '@shared/generic.service';

@Injectable({
  providedIn: 'root',
})
export class AusenciasService {
  private readonly endpoint = 'Ausencias';

  constructor(private genericService: GenericService) {}

  /** GET: Fetch all ausencias */
  getAll(): Observable<any> {
    return this.genericService.list(this.endpoint).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error fetching ausencias', err);
        return throwError(() => err);
      })
    );
  }

  /** POST: Add a new ausencia */
  add(ausencia: Partial<any>): Observable<any> {
    return this.genericService.create(this.endpoint, ausencia).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error adding ausencia', err);
        return throwError(() => err);
      })
    );
  }

  /** PUT: Update an existing ausencia */
  update(ausencia: any): Observable<any> {
    return this.genericService.update(this.endpoint, ausencia).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error updating ausencia', err);
        return throwError(() => err);
      })
    );
  }

  /** DELETE: Delete an ausencia */
  delete(id: number): Observable<any> {
    return this.genericService.delete(this.endpoint, id).pipe(
      catchError(err => {
        console.error('Error deleting ausencia', err);
        return throwError(() => err);
      })
    );
  }
}
