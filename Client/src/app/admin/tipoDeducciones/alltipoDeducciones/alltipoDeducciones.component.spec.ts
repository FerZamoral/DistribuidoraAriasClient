import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AllTipoDeduccionesComponent } from './alltipoDeducciones.component';

describe('AllTipoDeduccionesComponent', () => {
  let component: AllTipoDeduccionesComponent;
  let fixture: ComponentFixture<AllTipoDeduccionesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        /** Al ser un componente standalone basta con importarlo. */
        imports: [AllTipoDeduccionesComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTipoDeduccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
