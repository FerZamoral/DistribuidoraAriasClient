import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AusenciasService } from './ausencias.service';
import { AusenciaFormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { AllAusenciasDeleteComponent } from './dialogs/delete/delete.component';
import { rowsAnimation } from '@shared';
import { TableExportUtil } from '@shared';
import { formatDate, DatePipe, CommonModule } from '@angular/common';
import { materialImports } from '@shared/material-imports';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ausencia-list',
  templateUrl: './allausencias.component.html',
  styleUrls: ['./allausencias.component.scss'],
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
export class AllAusenciasComponent implements OnInit, OnDestroy {
  columnDefinitions = [
    { def: 'select', label: 'Seleccionar', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'number', visible: false },
    { def: 'nombreEmpleado', label: 'Empleado', type: 'text', visible: true },
    { def: 'fechaInicio', label: 'Fecha Inicio', type: 'date', visible: true },
    { def: 'fechaFin', label: 'Fecha Fin', type: 'date', visible: true },
    { def: 'porcentajeSalario', label: '% Salario', type: 'number', visible: true },
    { def: 'motivo', label: 'Motivo', type: 'text', visible: true },
    { def: 'actions', label: 'Acciones', type: 'actionBtn', visible: true }
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
    private ausenciasService: AusenciasService,
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
    this.ausenciasService.getAll().subscribe({
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
        this.snackBar.open('Error cargando ausencias', '', {
          duration: 3000,
          panelClass: 'snackbar-danger'
        });
        this.isLoading = false;
      }
    });
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions.filter(cd => cd.visible).map(cd => cd.def);
  }

  private refreshTable() {
    this.paginator.pageIndex = 0;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addNew() {
    const dialogRef = this.dialog.open(AusenciaFormDialogComponent, {
      width: '600px',
      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
    });
  }

  editCall(row: any) {
    const dialogRef = this.dialog.open(AusenciaFormDialogComponent, {
      width: '600px',
      data: { action: 'edit', ausencia: row }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
    });
  }

  deleteItem(row: any) {
    const dialogRef = this.dialog.open(AllAusenciasDeleteComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      this.ausenciasService.delete(row.id).subscribe({
        next: () => {
          this.loadData();
          this.snackBar.open('Ausencia eliminada', '', {
            duration: 2000,
            panelClass: 'snackbar-success'
          });
        },
        error: () => this.snackBar.open('Error al eliminar', '', {
          duration: 2000,
          panelClass: 'snackbar-danger'
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
    this.contextMenu?.openMenu();
  }

  exportExcel() {
    const exportData = this.dataSource.filteredData.map(x => ({
      ID: x.id,
      Empleado: x.nombreEmpleado,
      FechaInicio: x.fechaInicio,
      FechaFin: x.fechaFin,
      PorcentajeSalario: x.porcentajeSalario,
      Motivo: x.motivo
    }));
    TableExportUtil.exportToExcel(exportData, 'ausencias_export');
  }

  removeSelectedRows() {
    const total = this.selection.selected.length;
    this.dataSource.data = this.dataSource.data.filter(
      r => !this.selection.selected.includes(r)
    );
    this.selection.clear();
    this.snackBar.open(`${total} ausencia(s) eliminada(s) localmente`, '', {
      duration: 2000, panelClass: 'snackbar-danger'
    });
  }
}
