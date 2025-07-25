import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { rowsAnimation } from '@shared';
import { TableExportUtil } from '@shared';
import { formatDate, DatePipe, CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { materialImports } from '@shared/material-imports';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';

import { EmpleadosService } from './empleados.service';
import { AllEmpleadosDeleteComponent } from './dialogs/delete/delete.component';
import { EmpleadoFormDialogComponent } from './dialogs/form-dialog/form-dialog.component';

interface Empleado {
  id: number;
  nombre: string;
  cedula: string;
  salarioBase: number;
  correo: string;
  activo: boolean;
}

@Component({
  selector: 'app-empleado-list',
  templateUrl: './allempleados.component.html',
  styleUrls: ['./allempleados.component.scss'],
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
export class AllEmpleadosComponent implements OnInit, OnDestroy {
  columnDefinitions = [
    { def: 'select', label: 'Seleccionar', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'number', visible: false },
    { def: 'nombre', label: 'Nombre', type: 'text', visible: true },
    { def: 'cedula', label: 'Cédula', type: 'text', visible: true },
    { def: 'salarioBase', label: 'Salario Base', type: 'number', visible: true },
    { def: 'correo', label: 'Correo', type: 'email', visible: true },
    { def: 'activo', label: 'Activo', type: 'boolean', visible: true },
    { def: 'actions', label: 'Acciones', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  isLoading = true;
  private destroy$ = new Subject<void>();
  contextMenuPosition = { x: '0px', y: '0px' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu?: MatMenuTrigger;

  constructor(
    private empleadosService: EmpleadosService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

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
    this.empleadosService.getAll().subscribe({
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
        this.snackBar.open('Error cargando empleados', '', {
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
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addNew() {
    const dialogRef = this.dialog.open(EmpleadoFormDialogComponent, {
      width: '600px',
      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe((newEmpleado: Empleado | null) => {
      if (!newEmpleado) return;
      this.loadData();
      this.snackBar.open('Empleado agregado', '', {
        duration: 2000,
        panelClass: 'snackbar-success'
      });
    });
  }

  editCall(row: Empleado) {
    const dialogRef = this.dialog.open(EmpleadoFormDialogComponent, {
      width: '600px',
      data: { action: 'edit', empleado: row }
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (!updated) return;

      this.loadData();
      this.snackBar.open('Empleado editado', '', {
        duration: 2000,
        panelClass: 'snackbar-success'
      });
    });
  }

  deleteItem(row: Empleado) {
    const dialogRef = this.dialog.open(AllEmpleadosDeleteComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      this.empleadosService.delete(row.id).subscribe({
        next: () => {
          this.loadData();
          this.snackBar.open('Empleado eliminado', '', {
            duration: 2000, panelClass: 'snackbar-success'
          });
        },
        error: () => this.snackBar.open('Error al desactivar', '', {
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
      Nombre: x.nombre,
      Cedula: x.cedula,
      SalarioBase: x.salarioBase,
      Correo: x.correo,
      Activo: x.activo ? 'Sí' : 'No'
    }));
    TableExportUtil.exportToExcel(exportData, 'empleado_data_export');
  }

  removeSelectedRows() {
    const total = this.selection.selected.length;
    this.dataSource.data = this.dataSource.data.filter(
      r => !this.selection.selected.includes(r)
    );
    this.selection.clear();
    this.snackBar.open(`${total} empleado(s) desactivado(s)`, '', {
      duration: 2000, panelClass: 'snackbar-danger'
    });
  }
}
