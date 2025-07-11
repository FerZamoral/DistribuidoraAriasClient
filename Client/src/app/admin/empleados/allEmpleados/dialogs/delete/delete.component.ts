import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EmpleadosService } from '../../empleados.service';
import { MatButtonModule } from '@angular/material/button';
import { materialImports } from '@shared/material-imports';

export interface DialogData {
  id: number;
  nombre: string;
  cedula: string;
}

@Component({
    selector: 'app-empleado-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    imports: [
        materialImports
    ]
})
export class AllEmpleadosDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<AllEmpleadosDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public empleadosService: EmpleadosService
  ) {}
confirmDelete(): void {
  this.dialogRef.close(true); // Solo indica que se confirmó
}

}
