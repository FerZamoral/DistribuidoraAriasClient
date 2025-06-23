import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Role, AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NotificacionService, TipoMessage } from '@shared/notification.service';
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    imports: [
        RouterLink,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
    ]
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
     private noti: NotificacionService

  ) {
    super();
  }

 ngOnInit() {
  this.authForm = this.formBuilder.group({
    email: ['fernanda123@gmail.com', Validators.required],
    password: ['123567', Validators.required],
  });
  }

  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('username')?.setValue('admin@software.com');
    this.authForm.get('password')?.setValue('admin@123');
  }
  employeeSet() {
    this.authForm.get('username')?.setValue('employee@software.com');
    this.authForm.get('password')?.setValue('employee@123');
  }
  clientSet() {
    this.authForm.get('username')?.setValue('client@software.com');
    this.authForm.get('password')?.setValue('client@123');
  }
onSubmit() {
  // Marcamos que ya se intentó enviar
  this.submitted = true;

  // Si hay campos inválidos, salimos y mostramos errores en la UI
  if (this.authForm.invalid) {
    return;
  }

  // Indicamos que estamos en "loading"
  this.loading = true;

  this.authService
    .login(this.f['email'].value, this.f['password'].value)
    .subscribe({
      next: resp => {
        if (!resp.success) {
          this.noti.mensaje(
            'Advertencia',
            resp.message,
            TipoMessage.warning
          );
          this.loading = false;
          return;
        }

        // Login exitoso
        this.noti.mensaje(
          'Éxito',
          'Inicio de sesión exitoso',
          TipoMessage.success
        );

        const role = this.authService.currentUserValue?.role;
        if (role === Role.All || role === Role.Admin) {
          this.router.navigate(['/admin/dashboard/main']);
        } else {
          this.router.navigate(['/authentication/signin']);
        }
        this.loading = false;
      },
      error: err => {
        debugger;
        console.error('Error en login:', err);

        // Extraer el mensaje de error correctamente
        let errorMessage = 'Ocurrió un error inesperado';

        if (err && err.message) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }

        this.noti.mensaje(
          'Error',
          errorMessage,
          TipoMessage.error
        );

        // volvemos a permitir que el formulario se reenvíe
        this.submitted = false;
        this.loading = false;
      }
    });
}

}
