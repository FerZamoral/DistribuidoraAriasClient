import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { materialImports } from '@shared/material-imports';

export interface TipoDeduccionDeleteDialogData {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-tipo-deduccion-delete',
  standalone: true,
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  imports: [materialImports]
})
export class TipoDeduccionDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<TipoDeduccionDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoDeduccionDeleteDialogData
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true); // Indica que el usuario confirmó
  }
}
