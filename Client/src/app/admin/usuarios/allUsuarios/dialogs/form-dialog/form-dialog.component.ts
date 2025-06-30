import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { materialImports } from '@shared/material-imports';
import { Rol, Usuario, UsuarioRegisterDto, UsuarioUpdateDto } from '../../usuarios.model';
import { UsuariosService } from '../../usuarios.service';
import { GenericService } from '@shared/generic.service';


export interface DialogData {
  action: 'add' | 'edit';
  usuario?: any;
}

@Component({
  selector: 'app-usuario-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    materialImports
  ],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class UsuarioFormDialogComponent {
  roles: Rol[] = [];
  form: UntypedFormGroup;
  action: 'add' | 'edit';

  constructor(
    public dialogRef: MatDialogRef<UsuarioFormDialogComponent, Usuario>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private usuariosService: UsuariosService, private genericService: GenericService
  ) {
    this.action = data.action;
    this.form = this.fb.group({
      id:       [data.usuario?.id || 0],
      username: [data.usuario?.username || '', Validators.required],
      email:    [data.usuario?.email || '', [Validators.required, Validators.email]],
    roleId: [data.usuario?._Rol?.id ?? null, Validators.required],

      activo:   [data.usuario?.activo ?? true],
      password: ['', this.action === 'add' ? [Validators.required] : []]
    });
  }

  ngOnInit(): void {
    this.loadRoles();

  }
submit(): void {
  if (this.form.invalid) return;

  if (this.action === 'edit') {
    const dto: UsuarioUpdateDto = {
      id: this.form.value.id,
      username: this.form.value.username,
      email: this.form.value.email,
      roleId: this.form.value.roleId,
      activo: this.form.value.activo
    };

    this.usuariosService.update(dto).subscribe({
      next: user => this.dialogRef.close(user), //  envía objeto completo al padre
      error: err => {
        console.error('Error actualizando usuario:', err);
        this.dialogRef.close(null); //  no mostrar error, pero cerrar
      }
    });

  } else {
    const dto: UsuarioRegisterDto = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      roleId: this.form.value.roleId
    };

    this.usuariosService.add(dto).subscribe({
      next: user => this.dialogRef.close(user), //  envía objeto completo
      error: err => {
        console.error('Error creando usuario:', err);
        this.dialogRef.close(null); //  cerrar sin mostrar error
      }
    });
  }
}


  onNoClick(): void {
    this.dialogRef.close();
  }

    private loadRoles(): void {
    this.genericService.list("Rol").subscribe({
      next: (roles) => {
        debugger;
        this.roles = roles.data;
      
      },
      error: (err) => console.error('Error loading roles:', err)
    })
}
}
