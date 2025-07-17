import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { materialImports } from '@shared/material-imports';
import { EmpleadosService } from '../allEmpleados/empleados.service';
import { NotificacionService, TipoMessage } from '@shared/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-empleado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    materialImports
  ],
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.scss']
})
export class AddEmpleadoComponent implements OnInit {
  empleadoForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private empleadosService: EmpleadosService,
    private noti: NotificacionService,
    private router: Router
  ) {
    this.empleadoForm = this.fb.group({
        nombre: ['', [Validators.required,]],
        cedula: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
        correo: ['', [Validators.required, Validators.email]],
        salarioBase: [null, [Validators.required, Validators.min(1000)]],
        activo: [true, [Validators.required]]
});

  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      return;
    }

    this.empleadosService.add(this.empleadoForm.value).subscribe({
      next: () => {
        this.noti.mensaje('Éxito', 'Empleado agregado correctamente', TipoMessage.success);
        this.router.navigate(['/admin/empleados/allEmpleados']);
      },
      error: (err) => {
        console.error('Error al agregar empleado:', err);
        this.noti.mensaje('Error', 'No se pudo agregar el empleado', TipoMessage.error);
      }
    });
  }

  onCedulaInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 9);
    this.empleadoForm.get('cedula')?.setValue(input.value);
  }
}
