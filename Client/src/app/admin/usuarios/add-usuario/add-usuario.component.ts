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
import { Rol } from '../allUsuarios/usuarios.model';
import { UsuariosService } from '../allUsuarios/usuarios.service';
import { GenericService } from '@shared/generic.service';
import { NotificacionService, TipoMessage } from '@shared/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    materialImports
  ],
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss'],
})
export class AddUsuarioComponent implements OnInit {
  docForm!: UntypedFormGroup;
  roles: Rol[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private usuariosService: UsuariosService,
    private genericService: GenericService,
    private noti: NotificacionService,
    private router: Router
  ) {
    this.docForm = this.fb.group(
      {
        username: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z]+$')
        ]],
        email: ['', [
          Validators.required,
          Validators.email,
          Validators.minLength(5)
        ]],
        roleId: [null, [Validators.required, Validators.min(1)]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,}$/)
        ]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordsMatchValidator() }
    );
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles(): void {
    this.genericService.list('Rol').subscribe({
      next: (res: any) => this.roles = res.data,
      error: err => console.error('Error loading roles:', err)
    });
  }

  onSubmit() {
    if (this.docForm.invalid) {
      // opcional: marcar todos como touched para mostrar errores
      this.docForm.markAllAsTouched();
      return;
    }

    this.usuariosService.add(this.docForm.value).subscribe({
      next: () => {
        this.noti.mensaje('Éxito', 'Usuario agregado correctamente', TipoMessage.success);
        this.router.navigate(['/admin/usuarios/allUsuarios']);
      },
      error: err => {
        console.error('Error al agregar usuario:', err);
        this.noti.mensaje('Error', 'No se pudo agregar el usuario', TipoMessage.error);
      }
    });
  }

  /** Validador que asegura password === confirmPassword */
  private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pass = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value;
      return pass === confirm ? null : { passwordsMismatch: true };
    };
  }
}
