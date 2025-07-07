import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TipobonificacionDeleteComponent } from './delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('TipobonificacionDeleteComponent', () => {
  let component: TipobonificacionDeleteComponent;
  let fixture: ComponentFixture<TipobonificacionDeleteComponent>;

  // ‼️  Mock minimal para MatDialogRef
  const dialogRefStub = {
    close: jasmine.createSpy('close')
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TipobonificacionDeleteComponent], // componente standalone
        providers: [
          { provide: MatDialogRef, useValue: dialogRefStub },
          {
            provide: MAT_DIALOG_DATA,
            useValue: { id: 1, nombre: 'Bono prueba' } // datos ficticios
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TipobonificacionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close(true) on confirmDelete', () => {
    component.confirmDelete();
    expect(dialogRefStub.close).toHaveBeenCalledWith(true);
  });

  it('should call dialogRef.close(false) on cancel', () => {
    component.cancel();
    expect(dialogRefStub.close).toHaveBeenCalledWith(false);
  });
});
