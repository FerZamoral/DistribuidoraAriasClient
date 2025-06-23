import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum TipoMessage {
  error,
  info,
  success,
  warning,
}

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {

  constructor(private toastr: ToastrService) {
  }

  public mensaje(titulo: string, mensaje: string, tipo: TipoMessage) {
    // Convertir el mensaje a string si es un objeto
    const mensajeStr = typeof mensaje === 'string' ? mensaje : JSON.stringify(mensaje);

    switch (tipo) {
      case TipoMessage.success:
        this.toastr.success(mensajeStr, titulo);
        break;
      case TipoMessage.info:
        this.toastr.info(mensajeStr, titulo);
        break;
      case TipoMessage.warning:
        this.toastr.warning(mensajeStr, titulo);
        break;
      case TipoMessage.error:
        this.toastr.error(mensajeStr, titulo);
        break;
      default:
        this.toastr.info(mensajeStr, titulo);
        break;
    }
  }
}
