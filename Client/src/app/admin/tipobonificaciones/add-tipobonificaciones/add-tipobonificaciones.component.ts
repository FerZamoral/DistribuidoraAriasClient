import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { materialImports } from '@shared/material-imports';
import { TipobonificacionesService } from '../allTipoBonificaciones/tipoBonificaciones.service';
import { GenericService } from '@shared/generic.service';
import { NotificacionService, TipoMessage } from '@shared/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tipobonificacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    materialImports
  ],
  templateUrl: './add-tipobonificaciones.component.html',
  styleUrls: ['./add-tipobonificaciones.component.scss'],
})
export class AddTipobonificacionComponent implements OnInit {
  docForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private tipobonificacionesService: TipobonificacionesService,
    private genericService: GenericService,
    private noti: NotificacionService,
    private router: Router
  ) {
      this.docForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]]
    });
  }

  ngOnInit(): void {
  
  }

  onSubmit() {
    if (this.docForm.invalid) {
      // opcional: marcar todos como touched para mostrar errores
      this.docForm.markAllAsTouched();
      return;
    }

    this.tipobonificacionesService.add(this.docForm.value).subscribe({
      next: () => {
        this.noti.mensaje('Éxito', 'Tipo de bonificación agregado correctamente', TipoMessage.success);
        this.router.navigate(['/admin/tipobonificaciones/allTipobonificaciones']);
      },
      error: err => {
        console.error('Error al agregar tipo de bonificación:', err);
        this.noti.mensaje('Error', 'No se pudo agregar el tipo de bonificación', TipoMessage.error);
      }
    });
  }
}
