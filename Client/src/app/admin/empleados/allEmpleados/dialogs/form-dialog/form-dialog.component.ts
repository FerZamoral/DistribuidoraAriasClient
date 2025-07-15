import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { materialImports } from '@shared/material-imports';
import { EmpleadosService } from '../../empleados.service';

export interface DialogData {
  action: 'add' | 'edit';
  empleado?: any;
}

@Component({
  selector: 'app-empleado-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    materialImports
  ],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class EmpleadoFormDialogComponent {
  form: UntypedFormGroup;
  action: 'add' | 'edit';

  constructor(
    public dialogRef: MatDialogRef<EmpleadoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private empleadosService: EmpleadosService
  ) {
    this.action = data.action;
    this.form = this.fb.group({
      id: [data.empleado?.id || 0],
      nombre: [data.empleado?.nombre || '', Validators.required],
      cedula: [
        data.empleado?.cedula || '',
        [Validators.required, Validators.pattern(/^\d{9}$/)]
      ],
      correo: [
        data.empleado?.correo || '',
        [Validators.required, Validators.email]
      ],
      salarioBase: [
        data.empleado?.salarioBase || 0,
        [Validators.required, Validators.min(1000)]
      ],
      activo: [data.empleado?.activo ?? true]
    });

  }




  submit(): void {
  if (this.form.invalid) return;

  const operation = this.action === 'edit'
    ? this.empleadosService.update(this.form.value)
    : this.empleadosService.add(this.form.value);

  operation.subscribe({
    next: () => this.dialogRef.close(true),
    error: err => {
      console.error('Error guardando empleado:', err);
      this.dialogRef.close(false);
    }
  });
}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
