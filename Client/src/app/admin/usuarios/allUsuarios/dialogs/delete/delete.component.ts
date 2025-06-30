import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UsuariosService } from '../../usuarios.service';
import { MatButtonModule } from '@angular/material/button';
import { materialImports } from '@shared/material-imports';

export interface DialogData {
  id: number;
  username: string;
}

@Component({
    selector: 'app-usuario-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    imports: [
        materialImports
    ]
})
export class AllUsuariosDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<AllUsuariosDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public usuariosService: UsuariosService
  ) {}
confirmDelete(): void {
  this.dialogRef.close(true); // Solo indica que se confirmó
}

}
