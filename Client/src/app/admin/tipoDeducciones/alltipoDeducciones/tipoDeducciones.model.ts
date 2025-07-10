// src/app/models/tipo-deduccion.model.ts
/** Entidad que tu API devuelve */
export interface TipoDeduccion {
  id: number;
  nombre: string;
  descripcion: string;
}

/** DTO para crear (POST) */
export interface TipoDeduccionRegisterDto {
  nombre: string;
  descripcion: string;
  
}

/** DTO para actualizar (PUT) */
export interface TipoDeduccionUpdateDto {
  id: number;
  nombre: string;
  descripcion: string;
 
}
