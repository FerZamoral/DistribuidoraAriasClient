import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { materialImports } from '@shared/material-imports';

/** Datos que el componente padre inyectará al abrir el diálogo */
export interface DialogData {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-tipobonificacion-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [materialImports],
})
export class TipobonificacionDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<TipobonificacionDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  confirmDelete(): void {
    /** Solo devolvemos true al cerrar; el componente padre hará la petición */
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
