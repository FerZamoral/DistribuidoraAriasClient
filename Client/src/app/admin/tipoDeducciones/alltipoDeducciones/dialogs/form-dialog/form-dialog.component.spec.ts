import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TipoDeduccionFormDialogComponent } from './form-dialog.component';

describe('TipoDeduccionFormDialogComponent', () => {
  let component: TipoDeduccionFormDialogComponent;
  let fixture: ComponentFixture<TipoDeduccionFormDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TipoDeduccionFormDialogComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeduccionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
