import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { materialImports } from '@shared/material-imports';

import {
  TipoDeduccion,
  TipoDeduccionRegisterDto,
  TipoDeduccionUpdateDto,
} from '../../tipoDeducciones.model';
import { TipoDeduccionesService } from '../../tipoDeducciones.service';

export interface TipoDeduccionDialogData {
  action: 'add' | 'edit';
  tipoDeduccion?: TipoDeduccion;
}

@Component({
  selector: 'app-tipo-deduccion-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, materialImports],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class TipoDeduccionFormDialogComponent {
  form: UntypedFormGroup;
  action: 'add' | 'edit';

  constructor(
    public dialogRef: MatDialogRef<TipoDeduccionFormDialogComponent, TipoDeduccion>,
    @Inject(MAT_DIALOG_DATA) public data: TipoDeduccionDialogData,
    private fb: UntypedFormBuilder,
    private tipoDeduccionesService: TipoDeduccionesService
  ) {
    this.action = data.action;

    this.form = this.fb.group({
      id:          [data.tipoDeduccion?.id || 0],
      nombre:      [data.tipoDeduccion?.nombre || '', Validators.required],
      descripcion: [data.tipoDeduccion?.descripcion || '', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    if (this.action === 'edit') {
      const dto: TipoDeduccionUpdateDto = {
        id: this.form.value.id,
        nombre: this.form.value.nombre,
        descripcion: this.form.value.descripcion,
      };

      this.tipoDeduccionesService.update(dto).subscribe({
        next: (res) => this.dialogRef.close(res),
        error: (err) => {
          console.error('Error actualizando tipo de deducción:', err);
          this.dialogRef.close(null);
        },
      });
    } else {
      const dto: TipoDeduccionRegisterDto = {
        nombre: this.form.value.nombre,
        descripcion: this.form.value.descripcion,
      };

      this.tipoDeduccionesService.add(dto).subscribe({
        next: (res) => this.dialogRef.close(res),
        error: (err) => {
          console.error('Error creando tipo de deducción:', err);
          this.dialogRef.close(null);
        },
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
