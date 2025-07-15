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
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
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

import { TipoDeduccionesService } from  './tipoDeducciones.service';
import { TipoDeduccionDeleteComponent } from './dialogs/delete/delete.component';
import { TipoDeduccionFormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { TipoDeduccion } from './tipoDeducciones.model';

@Component({
  selector: 'app-tipo-deduccion-list',
  templateUrl: './alltipodeducciones.component.html',
  styleUrls: ['./alltipodeducciones.component.scss'],
  animations: [rowsAnimation],
  standalone: true,
  imports: [
    CommonModule,
    materialImports,
    BreadcrumbComponent,
    FormsModule,
  ],
})
export class AllTipoDeduccionesComponent implements OnInit, OnDestroy {
  columnDefinitions = [
    { def: 'select',      label: 'Seleccionar', type: 'check',     visible: true  },
    { def: 'id',          label: 'ID',          type: 'number',    visible: false },
    { def: 'nombre',      label: 'Nombre',      type: 'text',      visible: true  },
    { def: 'descripcion', label: 'Descripción', type: 'text',      visible: true  },
    { def: 'actions',     label: 'Acciones',    type: 'actionBtn', visible: true  },
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
    private tipoDeduccionesService: TipoDeduccionesService,
    public dialog:               MatDialog,
    private snackBar:            MatSnackBar
  ) {}

  /* ---------------- Ciclo de vida ---------------- */
  ngOnInit() { this.loadData(); }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refresh() { this.loadData(); }

  /* ---------------- Lógica principal ---------------- */
private loadData() {
  this.isLoading = true;
  this.tipoDeduccionesService.getAll().subscribe({
    next: (res) => {
      this.dataSource.data = res.data; // CORREGIDO: asignar res directamente
      this.isLoading = false;
      this.refreshTable();
      this.dataSource.filterPredicate = (row, filter) =>
        Object.values(row).some(v =>
          v?.toString().toLowerCase().includes(filter)
        );
    },
    error: () => {
      this.snackBar.open('Error cargando tipos de deducción', '', {
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
    this.paginator.pageIndex    = 0;
    this.dataSource.paginator   = this.paginator;
    this.dataSource.sort        = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /* ---------------- CRUD acciones ---------------- */
  addNew() {
    const dialogRef = this.dialog.open(TipoDeduccionFormDialogComponent, {
      width: '600px',
      data: { action: 'add' },
    });

    dialogRef.afterClosed().subscribe((nuevo: TipoDeduccion | null) => {
      if (!nuevo) return;
      this.loadData();
      this.snackBar.open('Tipo de deducción agregado', '', {
        duration: 2000,
        panelClass: 'snackbar-success',
      });
    });
  }

  editCall(row: TipoDeduccion) {
    const dialogRef = this.dialog.open(TipoDeduccionFormDialogComponent, {
      width: '600px',
      data: { action: 'edit', tipoDeduccion: row },
    });

    dialogRef.afterClosed().subscribe((updated: TipoDeduccion | null) => {
      if (!updated) return;
      this.loadData();
      this.snackBar.open('Tipo de deducción editado', '', {
        duration: 2000,
        panelClass: 'snackbar-success',
      });
    });
  }

  deleteItem(row: TipoDeduccion): void {
    this.tipoDeduccionesService.delete(row.id).subscribe({
      next: () => {
        this.loadData();                                // refresca la tabla
        this.snackBar.open('Tipo eliminado', '', {
          duration: 2000,
          panelClass: 'snackbar-success',
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al eliminar', '', {
          duration: 2000,
          panelClass: 'snackbar-danger',
        });
      },
    });
  }

  /* ---------------- Herramientas tabla ---------------- */
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
      y: `${event.clientY}px`,
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
      Descripción: x.descripcion,
    }));
    TableExportUtil.exportToExcel(exportData, 'tipo_deduccion_data_export');
  }

  removeSelectedRows() {
    const total = this.selection.selected.length;
    this.dataSource.data = this.dataSource.data.filter(
      r => !this.selection.selected.includes(r)
    );
    this.selection.clear();
    this.snackBar.open(
      `${total} tipo(s) de deducción desactivado(s)`,
      '',
      { duration: 2000, panelClass: 'snackbar-danger' }
    );
  }
}
