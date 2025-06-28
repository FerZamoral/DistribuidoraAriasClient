// src/app/services/usuarios.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { GenericService } from '@shared/generic.service';
import { Usuario } from './usuarios.model';


@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly endpoint = 'Usuario';

  constructor(private genericService: GenericService) {}

  /** GET: Fetch all usuarios */
  getAll(): Observable<any> {
    return this.genericService.list(this.endpoint).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error fetching usuarios', err);
        return throwError(() => err);
      })
    );
  }

  /** POST: Add a new usuario */
  add(usuario: Partial<any>): Observable<any> {
    return this.genericService.create(this.endpoint, usuario).pipe(
      map((res: any) => res as any),
      catchError(err => {
        console.error('Error adding usuario', err);
        return throwError(() => err);
      })
    );
  }

  /** PUT: Update an existing usuario */
  update(usuario: any): Observable<any> {
    return this.genericService.update(this.endpoint, usuario).pipe(
      map((res: any) => res as Usuario),
      catchError(err => {
        console.error('Error updating usuario', err);
        return throwError(() => err);
      })
    );
  }

  /** DELETE (lógico): desactiva un usuario */
  delete(id: number): Observable<void> {
    // Para borrado lógico, podrías llamar a update pasando activo=false,
    // pero si tu API soporta DELETE directamente:
    return this.genericService.get(this.endpoint, id).pipe(
      // primero obtener el usuario
      map(res => res as Usuario),
      map(user => ({ ...user, activo: false })),
      // luego actualizarlo
      switchMap(updated =>
        this.genericService.update(this.endpoint, id)
      ),
      map(() => void 0),
      catchError(err => {
        console.error('Error deleting usuario', err);
        return throwError(() => err);
      })
    );
  }
}
