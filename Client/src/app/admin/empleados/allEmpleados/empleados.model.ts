export interface Empleado {
  id: number;
  nombre: string;
  cedula: string;
  correo: string;
  salarioBase: number;
  activo: boolean;
}

// DTOs
export interface CrearEmpleadoDto {
  nombre: string;
  cedula: string;
  correo: string;
  salarioBase: number;
  activo: boolean;
}

export interface ActualizarEmpleadoDto {
  nombre: string;
  cedula: string;
  correo: string;
  salarioBase: number;
  activo: boolean;
}