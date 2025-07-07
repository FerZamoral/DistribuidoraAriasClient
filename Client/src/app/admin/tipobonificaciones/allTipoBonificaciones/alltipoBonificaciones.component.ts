// src/app/admin/tipobonificaciones/allTipoBonificaciones/alltipobonificaciones.component.ts
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

import { TipobonificacionesService } from '../allTipoBonificaciones/tipoBonificaciones.service';

import { Tipobonificacion } from './tipoBonificaciones.model';
//VEEEEEEER
import { TipobonificacionFormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { TipobonificacionDeleteComponent }     from './dialogs/delete/delete.component';



@Component({
  selector: 'app-tipobonificacion-list',
  templateUrl: './alltipobonificaciones.component.html',
  styleUrls: ['./alltipobonificaciones.component.scss'],
  animations: [rowsAnimation],
  standalone: true,
  imports: [
    CommonModule,
    materialImports,
    BreadcrumbComponent,
    FormsModule,
  ]
})
export class AlltipobonificacionesComponent implements OnInit, OnDestroy {
  columnDefinitions = [
    { def: 'select', label: 'Seleccionar', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'number', visible: true },
    { def: 'nombre', label: 'Nombre', type: 'text', visible: true },
    { def: 'descripcion', label: 'Descripción', type: 'text', visible: true },
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
    private tipobonificacionesService: TipobonificacionesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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
    this.tipobonificacionesService.getAll().subscribe({
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
        this.snackBar.open('Error cargando tipos de bonificación', '', {
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
    const dialogRef = this.dialog.open(TipobonificacionFormDialogComponent, {
      width: '600px',
      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe((nuevo: Tipobonificacion | null) => {
      if (!nuevo) return;
      this.loadData();
      this.snackBar.open('Tipo de bonificación agregado', '', {
        duration: 2000,
        panelClass: 'snackbar-success'
      });
    });
  }

  editCall(row: Tipobonificacion) {
    const dialogRef = this.dialog.open(TipobonificacionFormDialogComponent, {
      width: '600px',
      data: { action: 'edit', tipobonificacion: row }
    });

    dialogRef.afterClosed().subscribe((actualizado: Tipobonificacion | null) => {
      if (!actualizado) return;

      this.loadData();
      this.snackBar.open('Tipo de bonificación editado', '', {
        duration: 2000,
        panelClass: 'snackbar-success'
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
      Descripción: x.descripcion,
    }));
    TableExportUtil.exportToExcel(exportData, 'tipobonificaciones_export');
  }

  removeSelectedRows() {
    const total = this.selection.selected.length;
    const toRemove = this.selection.selected.map(r => r.id);
    // En este ejemplo, simplemente los remueve del frontend
    this.dataSource.data = this.dataSource.data.filter(r => !toRemove.includes(r.id));
    this.selection.clear();
    this.snackBar.open(`${total} tipo(s) de bonificación eliminados`, '', {
      duration: 2000, panelClass: 'snackbar-danger'
    });
  }
  deleteItem(row: Tipobonificacion): void {
  this.tipobonificacionesService.delete(row.id).subscribe({
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
}
