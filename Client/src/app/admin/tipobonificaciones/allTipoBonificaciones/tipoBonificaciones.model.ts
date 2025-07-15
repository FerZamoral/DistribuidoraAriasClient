// src/app/models/tipobonificacion.model.ts
// Modelo que usarás en el frontend
export interface Tipobonificacion {
  id: number;
  nombre: string;
  descripcion: string;
}

/* ----------  DTOs que enviarás al API ---------- */

// Crear
export interface TipobonificacionCreateDto {
  nombre: string;
  descripcion: string;
}

// Actualizar
export interface TipobonificacionUpdateDto {
  id: number;
  nombre: string;
  descripcion: string;
}
