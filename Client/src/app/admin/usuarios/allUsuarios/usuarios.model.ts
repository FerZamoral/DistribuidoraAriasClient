// src/app/models/usuario.model.ts
export interface Usuario {
  id: number;
  username: string;
  email: string;
  roleName: string;
  activo: boolean;
}

// DTOs que enviarás al API
export interface UsuarioRegisterDto {
  username: string;
  email: string;
  password: string;
  roleId: number;
}

export interface UsuarioUpdateDto {
  id: number;
  username: string;
  email: string;
  roleId: number;
  activo: boolean;
}

export interface Rol {
  id: number;
  nombre: string;
}
