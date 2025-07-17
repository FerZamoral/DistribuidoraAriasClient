import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { materialImports } from '@shared/material-imports';
import { AusenciasService } from '../allAusencias/ausencias.service';
import { GenericService } from '@shared/generic.service';
import { NotificacionService, TipoMessage } from '@shared/notification.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-ausencia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    materialImports
  ],
  templateUrl: './add-ausencia.component.html',
  styleUrls: ['./add-ausencia.component.scss'],
})
export class AddAusenciaComponent implements OnInit {
  form!: UntypedFormGroup;
  empleados: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private ausenciasService: AusenciasService,
    private genericService: GenericService,
    private noti: NotificacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      empleadoId: [null, Validators.required],
      motivo: ['', [Validators.required, Validators.maxLength(300)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      porcentajeSalario: [
        '', [Validators.required, Validators.min(1), Validators.max(100)]
      ]
    }, { validators: this.validarFechas });

    this.loadEmpleados();
  }

  private loadEmpleados(): void {
    this.genericService.list('Empleados').subscribe({
      next: res => {
        this.empleados = res.data.filter((emp: any) => emp.activo === true);
      },
      error: err => console.error('Error al cargar empleados:', err)
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

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const dto = {
      ...formValue,
      porcentajeSalario: formValue.porcentajeSalario / 100,
      fechaInicio: this.formatDateOnly(formValue.fechaInicio),
      fechaFin: this.formatDateOnly(formValue.fechaFin)
    };

    this.ausenciasService.add(dto).subscribe({
      next: () => {
        this.noti.mensaje('Éxito', 'Ausencia agregada correctamente', TipoMessage.success);
        this.router.navigate(['/admin/ausencias/allAusencias']);
      },
      error: err => {
        console.error('Error al agregar ausencia:', err);
        this.noti.mensaje('Error', 'No se pudo agregar la ausencia', TipoMessage.error);
      }
    });
  }

  private formatDateOnly(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
