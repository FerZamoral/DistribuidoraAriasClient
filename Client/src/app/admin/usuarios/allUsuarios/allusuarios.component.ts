import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort }      from '@angular/material/sort';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject }        from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { rowsAnimation }  from '@shared';
import { TableExportUtil } from '@shared';
import { formatDate, DatePipe, CommonModule } from '@angular/common';
import { MatTableDataSource }  from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormsModule }         from '@angular/forms';
import { materialImports }     from '@shared/material-imports';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';

import { UsuariosService } from './usuarios.service';
import { AllUsuariosDeleteComponent } from './dialogs/delete/delete.component';
import { UsuarioFormDialogComponent } from './dialogs/form-dialog/form-dialog.component';

interface Usuario {
  id: number;
  username: string;
  email: string;
  roleName: string;
  activo: boolean;
}

@Component({
  selector: 'app-usuario-list',
  templateUrl: './allusuarios.component.html',
  styleUrls: ['./allusuarios.component.scss'],
  animations: [rowsAnimation],
  imports: [
    CommonModule,
    materialImports,
    BreadcrumbComponent,
    FormsModule,
    DatePipe,
    FeatherIconsComponent,
  ]
})
export class AllusuariosComponent implements OnInit, OnDestroy {
  columnDefinitions = [
    { def: 'select',   label: 'Seleccionar', type: 'check',     visible: true  },
    { def: 'id',       label: 'ID',          type: 'number',    visible: false },
    { def: 'username', label: 'Usuario',     type: 'text',      visible: true  },
    { def: 'email',    label: 'Correo',      type: 'email',     visible: true  },
    { def: 'roleName', label: 'Rol',         type: 'text',      visible: true  },
    { def: 'activo',   label: 'Activo',      type: 'boolean',   visible: true  },
    { def: 'actions',  label: 'Acciones',    type: 'actionBtn', visible: true  },
  ];

  dataSource = new MatTableDataSource<any>([]);
  selection  = new SelectionModel<any>(true, []);
  isLoading  = true;
  private destroy$ = new Subject<void>();
  contextMenuPosition = { x: '0px', y: '0px' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;
  @ViewChild('filter')     filter!: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu?: MatMenuTrigger;

  constructor(
    private usuariosService: UsuariosService,
    public dialog:        MatDialog,
    private snackBar:     MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refresh() {
    this.loadData();
  }

  private loadData() {
    this.isLoading = true;
    this.usuariosService.getAll().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
        this.isLoading = false;
        this.refreshTable();
        this.dataSource.filterPredicate = (row, filter) =>
          Object.values(row).some(v =>
            v?.toString().toLowerCase().includes(filter)
          );
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Error cargando usuarios', '', {
          duration: 3000,
          panelClass: 'snackbar-danger'
        });
        this.isLoading = false;
      }
    });
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter(cd => cd.visible)
      .map(cd => cd.def);
  }

  private refreshTable() {
    this.paginator.pageIndex = 0;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addNew() {
    const dialogRef = this.dialog.open(UsuarioFormDialogComponent, {
      width: '600px',
      data: { action: 'add' }
    });
    dialogRef.afterClosed().subscribe((newUser: any) => {
      if (!newUser) return;
      this.usuariosService.add(newUser).subscribe({
        next: user => {
          this.dataSource.data = [user, ...this.dataSource.data];
          this.refreshTable();
          this.snackBar.open('Usuario agregado', '', {
            duration: 2000, panelClass: 'snackbar-success'
          });
        },
        error: () => this.snackBar.open('Error al agregar', '', {
          duration: 2000, panelClass: 'snackbar-danger'
        })
      });
    });
  }

  editCall(row: any) {
    const dialogRef = this.dialog.open(UsuarioFormDialogComponent, {
      width: '600px',
      data: { action: 'edit', usuario: row }
    });
    dialogRef.afterClosed().subscribe((updated: any) => {
      if (!updated) return;
      this.usuariosService.update(updated).subscribe({
        next: user => {
          const idx = this.dataSource.data.findIndex(u => u.id === user.id);
          this.dataSource.data[idx] = user;
          this.dataSource._updateChangeSubscription();
          this.snackBar.open('Usuario editado', '', {
            duration: 2000, panelClass: 'snackbar-success'
          });
        },
        error: () => this.snackBar.open('Error al editar', '', {
          duration: 2000, panelClass: 'snackbar-danger'
        })
      });
    });
  }

  deleteItem(row: any) {
    const dialogRef = this.dialog.open(AllUsuariosDeleteComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.usuariosService.delete(row.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== row.id);
          this.refreshTable();
          this.snackBar.open('Usuario desactivado', '', {
            duration: 2000, panelClass: 'snackbar-success'
          });
        },
        error: () => this.snackBar.open('Error al eliminar', '', {
          duration: 2000, panelClass: 'snackbar-danger'
        })
      });
    });
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(r => this.selection.select(r));
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  onContextMenu(event: MouseEvent, row: any) {
    event.preventDefault();
    this.contextMenuPosition = {
      x: `${event.clientX}px`,
      y: `${event.clientY}px`
    };
    if (this.contextMenu) {
      this.contextMenu.menuData = { row };
      this.contextMenu.menu?.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }

  exportExcel() {
    const exportData = this.dataSource.filteredData.map(x => ({
      ID: x.id,
      Username: x.username,
      Email: x.email,
      Role: x.roleName,
      Activo: x.activo ? 'Sí' : 'No'
    }));
    TableExportUtil.exportToExcel(exportData, 'usuario_data_export');
  }

  removeSelectedRows() {
    const total = this.selection.selected.length;
    this.dataSource.data = this.dataSource.data.filter(
      r => !this.selection.selected.includes(r)
    );
    this.selection.clear();
    this.snackBar.open(`${total} usuario(s) desactivado(s)`, '', {
      duration: 2000, panelClass: 'snackbar-danger'
    });
  }
}
