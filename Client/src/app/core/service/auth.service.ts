import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  of,
  throwError,
  switchMap,
  map,
  catchError,
} from 'rxjs';

import { User } from '../models/user';
import { environment } from 'environments/environment';
import { Role } from '../models/role';
import { GenericService } from '@shared/generic.service';
import { jwtDecode } from 'jwt-decode';


interface LoginApiResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    expiration: string;
  };
}

interface DecodedToken {
  sub: string;
  unique_name: string;
  role: string;
  exp: number;
  iat: number;
  email: string;
  nombre : string;
  apellidos: string;

}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  private baseUrl = environment.apiUrl; // termina en `/`

  constructor(
    private http: HttpClient,
    private gService: GenericService // para cargar datos extra del usuario
  ) {
    // Inicializa desde localStorage
    const stored = localStorage.getItem('currentUser');
    const user = stored ? (JSON.parse(stored) as User) : null;
    this.currentUserSubject.next(user);
    this.authenticatedSubject.next(!!user);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<LoginApiResponse> {
    return this.http
      .post<LoginApiResponse>(`${this.baseUrl}Auth/login`, { email, password })
      .pipe(
        switchMap(resp => {
          debugger;
          const token = resp.data.token;
          if (!token) return throwError(() => 'No token returned');

          // Decodificar JWT
           const decoded = this.getDecodedToken(token);

          // Armar usuario mínimo
          const user = new User();
          user.id = parseInt(decoded.sub, 10);
          user.username = decoded.unique_name;
          user.role = decoded.role as Role;
           user.token = token;
           user.img = null;
           user.firstName = decoded.nombre;
           user.lastName = decoded.apellidos;




          // Guardar token y usuario provisional
          localStorage.setItem('token', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.authenticatedSubject.next(true);

          // Retornar respuesta del login
          return of(resp);

          // // Opcional: cargar datos extra del usuario via GenericService
          // return this.gService.get('Usuarios', user.id).pipe(
          //   map(full => {
          //     // mergea los datos recibidos
          //     const merged = { ...user, ...full };
          //     localStorage.setItem('currentUser', JSON.stringify(merged));
          //     this.currentUserSubject.next(merged);
          //     return resp;
          //   })
          // );
        }),
       catchError((err: any) => {
        debugger;
  this.authenticatedSubject.next(false);
  return throwError(() => err.error);  // relanza solo el objeto JSON
})
      );
  }

  logout(): Observable<{ success: boolean }> {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.authenticatedSubject.next(false);
    return of({ success: false });
  }

   get isAuthenticated() {
    if (this.currentUserValue != null) {
      this.authenticatedSubject.next(true);
    } else {
      this.authenticatedSubject.next(false);
    }
    return this.authenticatedSubject.asObservable();
  }



getDecodedToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token); // Uso directo de jwtDecode
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }



}
