import {
  Component, Inject
} from '@angular/core';
import {
  UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { materialImports } from '@shared/material-imports';
import { AusenciasService } from '../../ausencias.service';
import { GenericService } from '@shared/generic.service';

@Component({
  selector: 'app-ausencia-form-dialog',
  standalone: true,
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    materialImports
  ]
})
export class AusenciaFormDialogComponent {
  form: UntypedFormGroup;
  empleados: any[] = [];
  action: 'add' | 'edit';

  constructor(
    public dialogRef: MatDialogRef<AusenciaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private ausenciasService: AusenciasService,
    private genericService: GenericService
  ) {
    this.action = data.action;

    this.form = this.fb.group({
      id: [data.ausencia?.id || 0],
      empleadoId: [data.ausencia?.empleadoId ?? null, Validators.required],
      fechaInicio: [data.ausencia?.fechaInicio ?? '', Validators.required],
      fechaFin: [data.ausencia?.fechaFin ?? '', Validators.required],
      porcentajeSalario: [
        data.ausencia?.porcentajeSalario ?? '',
        [Validators.required, Validators.min(1), Validators.max(100)]
      ],
      motivo: [data.ausencia?.motivo ?? '', Validators.maxLength(300)]
    }, 
    {
      validators: this.validarFechas
    });
  }


  validarFechas(group: AbstractControl): ValidationErrors | null {
  const inicio = group.get('fechaInicio')?.value;
  const fin = group.get('fechaFin')?.value;
  if (inicio && fin && new Date(inicio) > new Date(fin)) {
    return { fechaInvalida: true };
  }
  return null;
}


  ngOnInit(): void {
    this.loadEmpleados();

    // Si es edición, convertir porcentajeSalario de decimal a entero
    if (this.action === 'edit' && this.form.value.porcentajeSalario !== null) {
      const originalValue = this.form.value.porcentajeSalario;
      this.form.patchValue({
        porcentajeSalario: originalValue * 100
      });
    }
  }

  private loadEmpleados() {
  this.genericService.list('Empleados').subscribe({
    next: res => {
      this.empleados = res.data.filter((emp: any) => emp.activo === true);
    },
    error: err => console.error('Error al cargar empleados:', err)
  });
}


  submit(): void {
  if (this.form.invalid) return;

  const formValue = this.form.value;

  // Convertir fechas a formato ISO compatible con DateOnly (yyyy-MM-dd)
  const dto = {
    ...formValue,
    porcentajeSalario: formValue.porcentajeSalario / 100,
    fechaInicio: this.formatDateOnly(formValue.fechaInicio),
    fechaFin: this.formatDateOnly(formValue.fechaFin)
  };

  if (this.action === 'edit') {
    this.ausenciasService.update(dto).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error actualizando ausencia:', err);
        this.dialogRef.close(false);
      }
    });
  } else {
    this.ausenciasService.add(dto).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error creando ausencia:', err);
        this.dialogRef.close(false);
      }
    });
  }
}

// Convierte objeto Date a 'yyyy-MM-dd'
private formatDateOnly(date: Date): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // 'yyyy-MM-dd'
}


  onNoClick(): void {
    this.dialogRef.close();
  }
}
