import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlltipobonificacionesComponent } from './alltipoBonificaciones.component';

describe('AlltipobonificacionesComponent', () => {
  let component: AlltipobonificacionesComponent;
  let fixture: ComponentFixture<AlltipobonificacionesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AlltipobonificacionesComponent], // standalone component
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltipobonificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
