export interface Ausencia  {
  id: number;
  empleadoId: number;
  fechaInicio: Date;
  fechaFin: Date;
  porcentajeSalario: number;
  motivo?: string;
  nombreEmpleado: string;
}

// DTOs
export interface CrearAusenciaDto {
  empleadoId: number;
  fechaInicio: Date;
  fechaFin: Date;
  porcentajeSalario: number;
  motivo?: string;
  nombreEmpleado: string;
}

export interface ActualizarAusenciaDto {
  empleadoId: number;
  fechaInicio: Date;
  fechaFin: Date;
  porcentajeSalario: number;
  motivo?: string;
  nombreEmpleado: string;
}