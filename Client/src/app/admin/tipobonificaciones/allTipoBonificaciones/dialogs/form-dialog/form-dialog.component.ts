import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { materialImports } from '@shared/material-imports';

import {
  Tipobonificacion,
  TipobonificacionCreateDto,
  TipobonificacionUpdateDto,
} from '../../tipoBonificaciones.model';

import { TipobonificacionesService } from '../../tipoBonificaciones.service';
export interface DialogData {
  action: 'add' | 'edit';
  tipobonificacion?: Tipobonificacion;
}

@Component({
  selector: 'app-tipobonificacion-form-dialog',
  standalone: true,
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, materialImports],
})
export class TipobonificacionFormDialogComponent implements OnInit {
  form: UntypedFormGroup;
  action: 'add' | 'edit';

  constructor(
    public dialogRef: MatDialogRef<
      TipobonificacionFormDialogComponent,
      Tipobonificacion
    >,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private service: TipobonificacionesService
  ) {
    this.action = data.action;

    this.form = this.fb.group({
      id: [data.tipobonificacion?.id ?? 0],
      nombre: [data.tipobonificacion?.nombre ?? '', Validators.required],
      descripcion: [
        data.tipobonificacion?.descripcion ?? '',
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    /* No carga de catálogos porque no hay roles ni listas externas */
  }

  /** Guardar / actualizar */
  submit(): void {
    if (this.form.invalid) return;

    if (this.action === 'edit') {
      const dto: TipobonificacionUpdateDto = this.form.value;
      this.service.update(dto).subscribe({
        next: (tb) => this.dialogRef.close(tb),
        error: (err) => {
          console.error('Error actualizando tipobonificación:', err);
          this.dialogRef.close(null);
        },
      });
    } else {
      const dto: TipobonificacionCreateDto = this.form.value;
      this.service.add(dto).subscribe({
        next: (tb) => this.dialogRef.close(tb),
        error: (err) => {
          console.error('Error creando tipobonificación:', err);
          this.dialogRef.close(null);
        },
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
