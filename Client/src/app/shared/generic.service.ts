import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GenericService {
  // URL del API, definida en enviroments->enviroment.ts
  urlAPI: string = environment.apiUrl;
  //Información usuario actual
  currentUser: any;

  //Inyectar cliente HTTP para las solicitudes al API
  constructor(private http: HttpClient) {}

  // Listar
  list(endopoint: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + endopoint);
  }
  // Obtener
  get(endopoint: string, filtro: any): Observable<any | any[]> {
    return this.http.get<any | any[]>(this.urlAPI + endopoint + `/${filtro}`);
  }
  // crear
  create(endopoint: string, objCreate: any | any): Observable<any | any[]> {
    return this.http.post<any | any[]>(this.urlAPI + endopoint, objCreate);
  }
  // actualizar
  update(endopoint: string, objUpdate: any | any): Observable<any | any[]> {
    return this.http.put<any | any[]>(
      this.urlAPI + endopoint + `/${objUpdate.id}`,
      objUpdate
    );
  }
  // eliminar
  delete(endpoint: string, id: number | string): Observable<any> {
    return this.http.delete<any>(this.urlAPI + endpoint + `/${id}`);
  }


  // shared/generic.service.ts
patch<T>(url: string, body: any): Observable<T> {
  return this.http.patch<T>(`${this.urlAPI}${url}`, body);
}


}
