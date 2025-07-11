import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AusenciasService } from '../../ausencias.service';
import { MatButtonModule } from '@angular/material/button';
import { materialImports } from '@shared/material-imports';
import { Ausencia } from '@core';

export interface DialogData {
  id: number;
  nombreEmpleado: string;
}

@Component({
    selector: 'app-ausencia-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    imports: [
        materialImports
    ]
})
export class AllAusenciasDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<AllAusenciasDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ausenciasService: AusenciasService
  ) {}
confirmDelete(): void {
  this.dialogRef.close(true); // Solo indica que se confirmó
}

}
